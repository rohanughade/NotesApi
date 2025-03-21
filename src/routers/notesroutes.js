const express = require("express");
const { getnote, createnote, deleteNote, updateNote } = require("../Controller/noteController");
const auth = require("../middleware/auth");
const noteRouter = express.Router();

noteRouter.get("/",auth,getnote)

noteRouter.post("/",auth,createnote)

noteRouter.delete("/:id",auth,deleteNote)

noteRouter.put("/:id",auth,updateNote)

module.exports = noteRouter