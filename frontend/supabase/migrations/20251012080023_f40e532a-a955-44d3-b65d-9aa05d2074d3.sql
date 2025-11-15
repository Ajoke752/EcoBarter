-- Create the app_role enum type for proper role management
CREATE TYPE public.app_role AS ENUM ('farmer', 'agent', 'admin');

-- Create user_roles table for secure role management (following security best practices)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop all existing policies that reference the role column
DROP POLICY IF EXISTS "Agents can view all pending waste reports" ON public.waste_reports;
DROP POLICY IF EXISTS "Agents can update waste report status" ON public.waste_reports;
DROP POLICY IF EXISTS "Agents can create collections" ON public.collections;

-- Update profiles table: remove default, then change type, then add default back
ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN role TYPE app_role USING role::text::app_role;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'farmer'::app_role;

-- Recreate policies using the new has_role function
CREATE POLICY "Agents can view all pending waste reports"
ON public.waste_reports
FOR SELECT
USING (public.has_role(auth.uid(), 'agent'::app_role));

CREATE POLICY "Agents can update waste report status"
ON public.waste_reports
FOR UPDATE
USING (public.has_role(auth.uid(), 'agent'::app_role));

CREATE POLICY "Agents can create collections"
ON public.collections
FOR INSERT
WITH CHECK (
  auth.uid() = agent_id AND 
  public.has_role(auth.uid(), 'agent'::app_role)
);

-- Update handle_new_user function to insert into user_roles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'farmer'::app_role)
  );
  
  -- Insert into user_roles for proper role management
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'farmer'::app_role)
  );
  
  RETURN NEW;
END;
$$;