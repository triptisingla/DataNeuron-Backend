import app from "./app.js";

const PORT=process.env.PORT||8000
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
