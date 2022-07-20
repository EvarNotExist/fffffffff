 function showNotes(typenote) {
        var html = '';
        BX24.callBatch({
            get_section: ['entity.section.get', {ENTITY: 'librarynotetwo', FILTER: {NAME: typenote}}],
            get_note: ['entity.item.get', {ENTITY: 'librarynotetwo', SORT: {DATE_ACTIVE_FROM: 'DESC', ID: 'ASC'}}],
            get_user: ['user.get'],
            get_book: ['entity.item.get', {ENTITY: 'librarybooktwo'}]
        }, function(result){

            html += '<table class="iksweb"><tbody>'; 

            for (var i = 0; i < Math.round(result.get_note.answer.total); i++) { 

                if (result.get_note.data()[i].SECTION == result.get_section.data()[0].ID) {

                    for (var o = 0; o < Math.round(result.get_book.answer.total); o++) { 
                        if (result.get_book.data()[o].ID == result.get_note.data()[i].PROPERTY_VALUES.bookid) {
                            html += '<tr class="note"><td>' + result.get_book.data()[o].PROPERTY_VALUES.name + '</td>';
                        }
                    }

                    for (var p = 0; p < Math.round(result.get_user.answer.total); p++) { 
                        if (result.get_user.data()[p].ID == result.get_note.data()[i].PROPERTY_VALUES.employeeid) {
                            html += '<td>' + result.get_user.data()[p].NAME + ' ' + result.get_user.data()[p].LAST_NAME + '</td>';
                        }
                    }

                        regDateNew = encodeDate(result.get_note.data()[i].PROPERTY_VALUES.date);
                        regDateOld = encodeDate(result.get_note.data()[i].PROPERTY_VALUES.returndate);
                        html += '<td>' + regDateNew + '</td>';
                        html += '<td>' + regDateOld + '</td>';

                    if (typenote == 'newnotes') {
                        html += '<td class="buttonnoteedit" style="display: none;"><input type="button" value="Возврат" onclick="returnNote(' + result.get_note.data()[i].ID + ');"></td>';
                    }

                }
            }  
            
            html += '</tbody></table>';

            if (html == '<table class="iksweb"><tbody></tbody></table>') {
                document.getElementById("notes").innerHTML = "<p>Записи отсутствуют.</p>";
            } else {
                if (typenote == 'oldnotes') {
                    html += '<input type="button" onclick="cleanHistory();" value="Очистить историю">';
                }
                document.getElementById("notes").innerHTML = html;
            }

        });
}
function showBooks() {
    
        htmlsec = '';
        BX24.callMethod('entity.item.get', {
            ENTITY: 'librarybooktwo',
            SORT: {DATE_ACTIVE_FROM: 'DESC', ID: 'ASC'},
            FILTER: {},
        }, function(result){

            item = result.data();

            htmlsec += '<table class="iksweb"><tbody>'; 
            
            for (var i = 0; i < Math.round(result.answer.total); i++) {
                htmlsec += '<tr class="note"><td>' + item[i].PROPERTY_VALUES.name + '</td>';
                htmlsec += '<td>' + item[i].PROPERTY_VALUES.author + '</td>';
                htmlsec += '<td>' + item[i].PROPERTY_VALUES.age + '</td>';
                htmlsec += '<td>' + item[i].PROPERTY_VALUES.tags + '</td>';
                htmlsec += '<td>' + item[i].PROPERTY_VALUES.count + '</td>';
                htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Изменить" onclick="editBookTab(' + item[i].ID + ');"></td>'
                htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Удалить" onclick="deleteBook(' + item[i].ID + ');"></td></tr>';
            }

            htmlsec += '</tbody></table>';

            if (htmlsec == '<table class="iksweb"><tbody></tbody></table>') {
                document.getElementById("books").innerHTML = "<p>Записи книг отсутствуют.</p>";
            } else {
                document.getElementById("books").innerHTML = htmlsec;
            }
        });

}
function pickUser() {
    
        BX24.selectUser(
            function(user) {
                itemUser = user; //user.id
                document.getElementById('locuser').value = itemUser.name;
            }   
        )

}

function showAcBooks() {
    
        var select = '';
        BX24.callBatch({
            get_booktwo: ['entity.item.get', {ENTITY: 'librarybooktwo', SORT: {ID: 'ASC'}}],
            get_notetwo: ['entity.item.get', {ENTITY: 'librarynotetwo'}]
        }, function(result){
            select += '<select id="selopt"><option selected value=" ">Выберите книгу</option>';
            for (var i = 0; i < Math.round(result.get_booktwo.answer.total); i++) {
                var getNoteByBook = result.get_notetwo.data().filter(function(res){ return res.PROPERTY_VALUES.bookid == result.get_booktwo.data()[i].ID })
                if (getNoteByBook.length >= result.get_booktwo.data()[i].PROPERTY_VALUES.count) {
                    select += '<option disabled value="' + result.get_booktwo.data()[i].ID + '">' + result.get_booktwo.data()[i].PROPERTY_VALUES.name + ' недоступно</option>';
                } else {
                    select += '<option value="' + result.get_booktwo.data()[i].ID + '">' + result.get_booktwo.data()[i].PROPERTY_VALUES.name + '</option>';
                }
            }
            select += '</select>';
            document.getElementById('mainselect').innerHTML = select;
        });

}

function addNote() {
    if (typeof itemUser == 'undefined'){
        var userid = " ";
    } else {
        var userid = itemUser.id;
    }
    var bookid = $("#selopt").val();
    var dateNote = $("#todaydate").val();
    var rdateNote = $("#returndate").val();
    if (bookid == " " || userid == " ") {
        setErr();
    } else {
        
            BX24.callMethod('entity.section.get', {
                ENTITY: 'librarynotetwo', 
                FILTER: {NAME: 'newnotes'}
            }, function(result){
                section = result.data();
                BX24.callMethod('entity.item.add', {
                    ENTITY: 'librarynotetwo',
                    DATE_ACTIVE_FROM: new Date(),
                    DETAIL_PICTURE: '',
                    NAME: 'OneOfThis',
                    PROPERTY_VALUES: {
                        employeeid: userid,
                        bookid: bookid,
                        date: dateNote,
                        returndate: rdateNote
                    },
                    SECTION: section[0].ID
                }, function(){
                    showAcBooks();
                    showNotes('newnotes');
                });
            });

    }
}

function addBook() {
    var toaddbookname = $("#toaddbookname").val();
    var toaddbookauthor = $("#toaddbookauthor").val();
    var toaddbookage = $("#toaddbookage").val();
    var toaddbooktag = $("#toaddbooktag").val();
    var toaddbookcount = $("#toaddbookcount").val();
    
        BX24.callMethod('entity.item.add', {
            ENTITY: 'librarybooktwo',
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_PICTURE: '',
            NAME: 'OneOfThis',
            PROPERTY_VALUES: {
                name: toaddbookname,
                author: toaddbookauthor,
                age: toaddbookage,
                tags: toaddbooktag,
                count: toaddbookcount
            }
        }, function(){
            showBooks();
        });

}

function returnNote(id) {
    
        BX24.callMethod('entity.section.get', {
            ENTITY: 'librarynotetwo', 
            FILTER: {NAME: 'oldnotes'}
        }, function(result){
            section = result.data();
            BX24.callMethod('entity.item.update', {
                ENTITY: 'librarynotetwo',
                ID: id,
                DATE_ACTIVE_FROM: new Date(),
                DETAIL_PICTURE: '',
                NAME: 'OneOfThis',
                SECTION: section[0].ID
            }, function(){
                showNotes('newnotes');
            });
        });

}

function editBookTab(id) {
    var tab = '';
    
        BX24.callMethod('entity.item.get', {
            ENTITY: 'librarybooktwo',
            FILTER: {ID: id}
        }, function(res) {
            item = res.data();
            tab += '<div id="formInputBook" class="forminputbook">';
            tab += '<input id="tabedName" type="text" placeholder="" value="'+ item[0].PROPERTY_VALUES.name +'">';
            tab += '<input id="tabedAuthor" type="text" placeholder="" value="'+ item[0].PROPERTY_VALUES.author +'">';
            tab += '<input id="tabedAge" type="text" placeholder="" value="'+ item[0].PROPERTY_VALUES.age +'">';
            tab += '<textarea id="tabedTags" rows="2" cols="30" name="text" placeholder="Теги">'+ item[0].PROPERTY_VALUES.tags +'</textarea>';
            tab += '<input id="tabedCount" type="number" placeholder="" value="'+ item[0].PROPERTY_VALUES.count +'">';
            tab += '<input type="button" onclick="editBook('+ item[0].ID +');" value="Добавить"><div id="itemErr"></div></div>';
            document.getElementById('formInEdBook').innerHTML = tab;
            document.getElementById("formInEdBook").style.display = "block";
        });

}

function editBook(id) {
    var tabName = $("#tabedName").val();
    var tabAuthor = $("#tabedAuthor").val();
    var tabAge = $("#tabedAge").val();
    var tabTags = $("#tabedTags").val();
    var tabCount = $("#tabedCount").val();
    
        BX24.callMethod('entity.item.update', {
            ENTITY: 'librarybooktwo',
            ID: id,
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_PICTURE: '',
            NAME: 'OneOfThis',
            PROPERTY_VALUES: {
                name: tabName,
                author: tabAuthor,
                age: tabAge,
                tags: tabTags,
                count: tabCount
            }
        }, function() {
            // tabcontent = document.getElementById("formInputBook");
            // tabcontent.style.display = "none";
            document.getElementById("formInEdBook").style.display = "none";
            showBooks();
        });

}

function deleteBook(id) {
    
        BX24.callMethod('entity.item.delete', {
            ENTITY: 'librarybooktwo',
            ID: id
        }, function(){
            showBooks();
        });

}

function cleanHistory(){
    
        BX24.callMethod('entity.section.get', {
            ENTITY: 'librarynotetwo', 
            FILTER: {NAME: 'oldnotes'}
        }, function(result){
            section = result.data();
            BX24.callMethod('entity.item.get', {
                ENTITY: 'librarynotetwo',
                FILTER: {SECTION: section[0].ID}
            }, function(res) {
                item = res.data();
                for (var i = 0; i < Math.round(res.answer.total); i++) {
                    BX24.callMethod('entity.item.delete', {
                        ENTITY: 'librarynotetwo',
                        ID: item[i].ID
                    });
                    if (i == Math.round(res.answer.total) - 1) {
                        showNotes('oldnotes');
                    }
                }
            });
        });

}


function filterBooks() {
    var fBookSect = $("#filterBookSelect").val();
    var fBookText = $("#filterBookText").val();
    fBookText = fBookText.toLowerCase();
    console.log(fBookText); 
    
        htmlsec = '';
        BX24.callMethod('entity.item.get', {
            ENTITY: 'librarybooktwo',
            SORT: {DATE_ACTIVE_FROM: 'DESC', ID: 'ASC'},
            FILTER: {},
        }, function(result){

            item = result.data();

            htmlsec += '<table class="iksweb"><tbody>'; 
            
            for (var i = 0; i < Math.round(result.answer.total); i++) {
                if (fBookSect == "1") {
                    fnItem = item[i].PROPERTY_VALUES.name.toLowerCase();
                    if (fnItem.includes(fBookText)) {
                        htmlsec += '<tr class="note"><td>' + item[i].PROPERTY_VALUES.name + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.author + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.age + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.tags + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.count + '</td>';
                        htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Изменить" onclick="editBookTab(' + item[i].ID + ');"></td>'
                        htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Удалить" onclick="deleteBook(' + item[i].ID + ');"></td></tr>';
                    }
                } else if (fBookSect == "2") {
                    faItem = item[i].PROPERTY_VALUES.author.toLowerCase();
                    if (faItem.includes(fBookText)) {
                        htmlsec += '<tr class="note"><td>' + item[i].PROPERTY_VALUES.name + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.author + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.age + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.tags + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.count + '</td>';
                        htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Изменить" onclick="editBookTab(' + item[i].ID + ');"></td>'
                        htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Удалить" onclick="deleteBook(' + item[i].ID + ');"></td></tr>';
                    }
                } else if (fBookSect == "3") {
                    ftItem = item[i].PROPERTY_VALUES.tags.toLowerCase();
                    if (ftItem.includes(fBookText)) {
                        htmlsec += '<tr class="note"><td>' + item[i].PROPERTY_VALUES.name + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.author + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.age + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.tags + '</td>';
                        htmlsec += '<td>' + item[i].PROPERTY_VALUES.count + '</td>';
                        htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Изменить" onclick="editBookTab(' + item[i].ID + ');"></td>'
                        htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Удалить" onclick="deleteBook(' + item[i].ID + ');"></td></tr>';
                    }
                } else if (fBookSect == " ") {
                    htmlsec += '<tr class="note"><td>' + item[i].PROPERTY_VALUES.name + '</td>';
                    htmlsec += '<td>' + item[i].PROPERTY_VALUES.author + '</td>';
                    htmlsec += '<td>' + item[i].PROPERTY_VALUES.age + '</td>';
                    htmlsec += '<td>' + item[i].PROPERTY_VALUES.tags + '</td>';
                    htmlsec += '<td>' + item[i].PROPERTY_VALUES.count + '</td>';
                    htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Изменить" onclick="editBookTab(' + item[i].ID + ');"></td>'
                    htmlsec += '<td class="buttonbookedit" style="display: none;"><input type="button" value="Удалить" onclick="deleteBook(' + item[i].ID + ');"></td></tr>';
                }
            }

            htmlsec += '</tbody></table>';

            if (htmlsec == '<table class="iksweb"><tbody></tbody></table>') {
                document.getElementById("books").innerHTML = "<p>Записи книг отсутствуют.</p>";
            } else {
                document.getElementById("books").innerHTML = htmlsec;
            }
        });

}
