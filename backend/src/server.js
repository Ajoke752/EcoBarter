import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ EcoBarter backend running on port ${PORT}`);
});
