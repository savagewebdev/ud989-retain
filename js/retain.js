$(function(){ // Jquery asynchronous processing.

    var model = {
        init: function() {
            if (!localStorage.notes) { // If localStorage.notes has not loaded,
                localStorage.notes = JSON.stringify([]); // Then create an array using JSON.stringify.
            } // JSON.stringify: A method which converts a JavaScript object or value to a JSON string.
        }, // JSON = JavaScript Object Notation -- a special syntax for JavaScript objects.

        add: function(obj) { // Adds called object notes to JSON file array.
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() { // Returns all notes in JSON file to normal data format via
            return JSON.parse(localStorage.notes); // JSON.parse.
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() { // Grab HTML content.
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){ // Event listener for submission.
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render(); // Initialization also renders view.render.
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){ // For each octopus note,
                htmlStr += '<li class="note">'+ // Add the notes content to a list item.
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr ); // Change the HTML of the object in question
        } // to the rendered variable.
    };

    octopus.init(); // Initialize the data.
});
