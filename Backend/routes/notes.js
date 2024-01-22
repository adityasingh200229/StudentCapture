const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../model/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: get all notes using : GET "./api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("something is very very wrooong (ayeinnnn)")
    }
})

// ROUTE 2: add a new notes using : post "./api/notes/addnote".login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid tilte').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charcters').isLength({ min: 5 })], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return bad req
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("something is very very wrooong (ayeinnnn)")
    }
})

// ROUTE 3: update an existing note using : PUT "./api/auth/upadatenote".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create new note object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //  find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("something is very very wrooong (ayeinnnn)")
    }
})
// ROUTE 4: Delete an existing note using : DELETE "./api/auth/deletenote".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
    //  find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // allow deletion only if the user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("something is very very wrooong (ayeinnnn)")
    }
})



module.exports = router
