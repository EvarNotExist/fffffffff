BX24.init(function(){BX24.callMethod('entity.delete', {'ENTITY': 'test'});});

BX24.init(function(){
    BX24.callMethod('entity.section.get', {
            ENTITY: 'library', 
            FILTER: {'NAME': 'Books'}}, 
            function(result){
                section = result.data();
            }
        );
});
BX24.init(function(){
    BX24.callMethod('entity.section.get', {
            ENTITY: 'library', 
            FILTER: {'NAME': 'Books'}}, 
            function(result){
                section = result.data();
            }
        );
});

console.log(section[0].ID); 
console.log(result.data());


BX24.init(function(){
    BX24.callMethod('entity.section.get', {
        ENTITY: 'library', 
        FILTER: {'NAME': 'Books'}}, 
        function(result){
            section = result.data();
            if (section[0] === undefined){
                console.log("Y");
            } else {
                console.log("N");
            }
        }
    );
});


BX24.init(function(){

    BX24.callMethod('entity.item.add', {
        ENTITY: 'librarybook',
        DATE_ACTIVE_FROM: new Date(),
        DETAIL_PICTURE: '',
        NAME: 'OneOfThis',
        PROPERTY_VALUES: {
            name: 'asd',
            author: 'xcv',
            age: '2009',
            tags: 'C++ PHP',
            count: 2
        }
    });

});

BX24.init(function(){

    BX24.callMethod('entity.item.add', {
        ENTITY: 'librarynote',
        DATE_ACTIVE_FROM: new Date(),
        DETAIL_PICTURE: '',
        NAME: 'OneOfThis',
        PROPERTY_VALUES: {
            employeeid: '1',
            bookid: '194',
            date: '2022-07-09T16:30',
            returndate: '2022-07-09T16:35'
        },
        SECTION: 232
    });

});

BX24.callMethod('entity.item.update', {
    ENTITY: 'librarynote',
    ID: 198,
    DATE_ACTIVE_FROM: new Date(),
    DETAIL_PICTURE: '',
    NAME: 'OneOfThis',
    PROPERTY_VALUES: {
        date: '2022-07-09T16:48'
    }
});

BX24.init(function(){
    BX24.callMethod('entity.item.get', {
        ENTITY: 'librarynote',
        FILTER: {SECTION_ID: 232}},
        function(result){
            item = result.data();
        }
    );
});

//для каждого entity свой набор property 
// сделать два entity

//перед 'entity.item.add' надо cоздать property которые будут в нем содержаться
BX24.init(function(){
    BX24.callMethod('entity.item.property.add', {
        ENTITY: 'library', 
        PROPERTY: 'name', 
        NAME: 'Name', 
        TYPE: 'S'
    });
    BX24.callMethod('entity.item.property.add', {
        ENTITY: 'library', 
        PROPERTY: 'author', 
        NAME: 'Author', 
        TYPE: 'S'
    });
});

BX24.init(function(){
    BX24.callMethod('entity.item.get', {
        ENTITY: 'menu',
        function(result){
            item = result.data();
        }
    });
});
BX24.init(function(){
    BX24.callMethod('entity.item.delete', {
        ENTITY: 'librarynote',
        ID: 234
    });
    showNotes();
});

console.log(item[0].PROPERTY_VALUES.author); 




BX24.init(function(){
    BX24.callMethod('entity.delete', {'ENTITY': ''});
});


var start = 50; //атрибут data-pag, полученный из ссылки
var count = 50; //константа (может изменится! - читать общее описание!)
var html = '';

BX24.callMethod('entity.item.get', {
   ENTITY: '<хранилище>',
   SORT: {DATE_ACTIVE_FROM: 'ASC', ID: 'ASC'},
   FILTER: {
   },
   start: start,
    }, function(e){
   if(e.answer.total>count && e.answer.start=='0') {
      var jj = count;
   }else{
   var jj = e.answer.total-start;
      if(jj>count){
         jj = count;
      }
   }

    html += '<div class="pag"><ul>'; 
    for(var i = 0; i <= Math.round(e.answer.total/count); i++) 
    { 
    html += '<li class="history" data-pag="'+count*i+'">'+(i+1)+'</li>'; 
    } 
    html += '</ul></div>';  
});





BX24.callMethod('entity.item.get', {
    ENTITY: 'librarynote',
    SORT: {ID: 'ASC'},
    FILTER: {}
    }, function(result){
        item = result.data();

    html += '<div class="page"><table class="iksweb"><tbody>'; 
    for (var i = 0; i <= Math.round(item); i++) {
        BX24.callMethod('user.get', {
            "ID": item[i].PROPERTY_VALUES.employeeid
        }, function(resultuser){
            
        }
        
        );





        html += '<tr class="note">'
                    '<td>' + item[i].PROPERTY_VALUES.bookid + '</td>'
                    '<td>' + item[i].PROPERTY_VALUES.employeeid + '</td>'
                    '<td>' + item[i].PROPERTY_VALUES.date + '</td>'
                '</tr>'; 
    }
    html += '</tbody></table>';
    
    document.getElementById("notes").innerHTML = html;
});


console.log($("#selopt").val());


$(document).ready(function () {
    BX24.init(function(){
        var html = '';
        BX24.callMethod('entity.item.get', {
            ENTITY: 'librarynote',
            SORT: {ID: 'ASC'},
            FILTER: {}
            }, function(result){
                item = result.data();
    
                html += '<div class="page"><table class="iksweb"><tbody>'; 
                for (var i = 0; i < Math.round(result.answer.total); i++) { 
                    BX24.callBatch({
                        get_user: ['user.get', {'ID': item[i].PROPERTY_VALUES.employeeid}],
                        get_book: ['entity.item.get', {ENTITY: 'librarybook', FILTER: {'ID': item[i].PROPERTY_VALUES.bookid}}]
                    }, function(result)
                    { 
                        itemBook = result.get_book.data();
                        itemUser = result.get_user.data();
                    
                    });
                    
                    html += '<tr class="note"><td>' + itemBook[0].PROPERTY_VALUES.name + '</td>';
                    html += '<td>' + itemUser[0].NAME + ' ' + itemUser[0].LAST_NAME + '</td><td>' + item[i].PROPERTY_VALUES.date + '</td>';
                    html += '<td><input type="button" value="Удалить" onclick="deleteNote(' + item[i].ID + ');"></td></tr>';
                    
                }
                html += '</tbody></table>';
                
                document.getElementById("notes").innerHTML = html;
            }
        );
    });
    });

    $(document).ready(function () {
        BX24.init(function(){
            var html = '';
            BX24.callBatch({
                get_note: ['entity.item.get', {ENTITY: 'librarynote', SORT: {ID: 'ASC'}}],
                get_user: ['user.get'],
                get_book: ['entity.item.get', {ENTITY: 'librarybook'}]
            }, function(result){
                html += '<div class="page"><table class="iksweb"><tbody>'; 
    
                for (var i = 0; i < Math.round(result.get_note.answer.total); i++) { 

                    for (var o = 0; o < Math.round(result.get_book.answer.total); o++) { 

                        if (result.get_book.data()[o].ID = result.get_note.data()[i].PROPERTY_VALUES.bookid) {
                            html += '<tr class="note"><td>' + result.get_book.data()[o].PROPERTY_VALUES.name + '</td>';
                        }

                    }
                    for (var p = 0; p < Math.round(result.get_user.answer.total); p++) { 

                        if (result.get_user.data()[p].ID = result.get_note.data()[i].PROPERTY_VALUES.employeeid) {
                            html += '<td>' + result.get_user.data()[p].NAME + ' ' + result.get_user.data()[p].LAST_NAME + '</td>';
                        }

                    }
                    // html += '<tr class="note"><td>' + itemBook[0].PROPERTY_VALUES.name + '</td>';
                    // html += '<td>' + itemUser[0].NAME + ' ' + itemUser[0].LAST_NAME + '</td><td>' + item[i].PROPERTY_VALUES.date + '</td>';
                    html += '<td>' + result.get_note.data()[i].PROPERTY_VALUES.date + '</td><td><input type="button" value="Удалить" onclick="deleteNote(' + result.get_note.data()[i].ID + ');"></td></tr>';
                }  
                html += '</tbody></table>';
                document.getElementById("notes").innerHTML = html;
            }
            );
        });
    });


    BX24.init(function(){
        var select = '';
        BX24.callMethod('entity.item.get', {
            ENTITY: 'librarybook',
            SORT: {ID: 'ASC'},
            FILTER: {}
            }, function(result){
                item = result.data();
                select += '<select id="selopt">';
                    for (var i = 0; i < Math.round(result.answer.total); i++) {
                        BX24.callMethod('entity.item.get', {
                            ENTITY: 'librarynote',
                            SORT: {},
                            FILTER: {ID: item[i].ID}
                            }, function(resultOther){
                                itemOther = resultOther.data();
                            }
                        );
                        if (item[i].PROPERTY_VALUES.count <= itemOther.length){
                            select += '<option value="' + item[i].ID + '">' + item[i].PROPERTY_VALUES.name + '</option>';
                        }
                    }
                select += '</select>';
                document.getElementById("notes").innerHTML = select;
            }
        );
    });

    BX24.init(function(){
        var select = '';
        BX24.callBatch({
            get_book: ['entity.item.get', {ENTITY: 'librarybook', SORT: {ID: 'ASC'}}],
            get_note: ['entity.item.get', {ENTITY: 'librarynote'}]
        }, function(result){
            select += '<select id="selopt">';
            for (var i = 0; i < Math.round(result.get_book.answer.total); i++) {
                var getNoteByBook = result.get_note.data().filter(function(res){ return res.PROPERTY_VALUES.bookid == result.get_book.data()[i].ID })
                if (getNoteByBook.length >= result.get_book.data()[i].PROPERTY_VALUES.count) {
                    select += '<option disabled value="' + result.get_book.data()[i].ID + '">' + result.get_book.data()[i].PROPERTY_VALUES.name + '</option>';
                } else {
                    select += '<option value="' + result.get_book.data()[i].ID + '">' + result.get_book.data()[i].PROPERTY_VALUES.name + '</option>';
                }
            }
            select += '</select>';
            document.getElementById("notes").innerHTML = select;
        });
    });



    document.getElementById('locuser').value = 'fuck';


// поиск по тегам
var str = 'Быть или не быть вот в чём вопрос.';
reg = str.toLowerCase();
var str2 = 'быть';
reg2 = str2.toLowerCase();
console.log(reg.includes(reg2)); 


var str = 'Быть или не быть вот в чём вопрос.';
str.toLowerCase();
var str2 = 'быть';
str2.toLowerCase();
console.log(str.includes(str2)); 





sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
output = new SimpleDateFormat("dd-MM-yyyy HH:mm");
d = sdf.parse('2013-01-08T17:16:36');
console.log(output.format(d));

var dateString = '2013-01-08T17:16:36';

var ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
    m = dateString.match(ISO);

var year = +m[1],
    month = +m[2],
    dayOfMonth = +m[3],
    hour = +m[4],
    minute = +m[5],

// timezone is now minutes

// your prefered way to construct
myDate = new Date();console.log(myDate);
myDate.setUTCFullYear(year);
myDate.setUTCMonth(month - 1);
myDate.setUTCDate(dayOfMonth);
myDate.setUTCHours(hour);
myDate.setUTCMinutes(minute); // timezone offset set here, after hours

console.log(myDate);



var dateString = '2013-01-08T17:16:36';

var ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
    m = dateString.match(ISO);

var year = +m[1],
    month = +m[2],
    dayOfMonth = +m[3],
    hour = +m[4],
    minute = +m[5];
if (month < 10) month = "0" + month;
regDate = hour+':'+minute+' '+dayOfMonth+'.'+month+'.'+year;
console.log(regDate);

if (bookid == " ") {
    console.log("Meh");
}
BX24.init(function(){
    BX24.callMethod('entity.item.get', {
        ENTITY: 'librarynote',
        SORT: {DATE_ACTIVE_FROM: 'ASC', ID: 'ASC'},
        FILTER: {SECTION: 240}
    }, function(res){
        if (res.data() == "") {
            console.log("Meh");
        } else {
            console.log("Yup");
        }
    }
    );
});

BX24.init(function(){
    BX24.callMethod('entity.item.get', {
        ENTITY: 'librarynote',
        SORT: {DATE_ACTIVE_FROM: 'ASC', ID: 'ASC'},
        FILTER: {SECTION: 232}
    }, function(res){
        if (res.data() == "") {
            console.log("Meh");
        } else {
            console.log("Yup");
        }
    }
    );
});
BX24.init(function(){
    BX24.callMethod('entity.section.get', {ENTITY: 'librarynote'});
});


        // <div id="formInputBook" class="forminputbook">
        //     <div id="formContentBook" class="formcontentbook">
        //         <h4>Ввод</h4>
        //         <input  type="text" placeholder="" value="">
        //         <input  type="text" placeholder="" value="">
        //         <input  type="text" placeholder="" value="">
        //         <input  type="text" placeholder="" value="">
        //         <input  type="text" placeholder="" value="">
        //         <input type="button" onclick="editBook();" value="Добавить">
        //         <div id="itemErr"></div>
        //     </div>
        // </div>


        // SORT: {DATE_ACTIVE_FROM: 'ASC', ID: 'ASC'},


        BX24.init(function(){
BX24.callBatch({
    add: ['entity.add', {'ENTITY': 'librarybook', 'NAME': 'LibraryBook', 'ACCESS': {U1:'W',AU:'R'}}],
    add: ['entity.add', {'ENTITY': 'librarynote', 'NAME': 'LibraryNote', 'ACCESS': {U1:'W',AU:'R'}}],
    add: ['entity.section.add', {ENTITY: 'librarynote', 'NAME': 'newnotes'}],
    add: ['entity.section.add', {ENTITY: 'librarynote', 'NAME': 'oldnotes'}],
    add: ['entity.item.property.add', {ENTITY: 'librarybook', PROPERTY: 'name', NAME: 'Name', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarybook', PROPERTY: 'author', NAME: 'Author', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarybook', PROPERTY: 'age', NAME: 'Age', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarybook', PROPERTY: 'tags', NAME: 'Tags', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarybook', PROPERTY: 'count', NAME: 'Count', TYPE: 'N'}],
    add: ['entity.item.property.add', {ENTITY: 'librarynote', PROPERTY: 'bookid', NAME: 'BookId', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarynote', PROPERTY: 'employeeid', NAME: 'EmployeeId', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarynote', PROPERTY: 'date', NAME: 'Date', TYPE: 'S'}],
    add: ['entity.item.property.add', {ENTITY: 'librarynote', PROPERTY: 'returndate', NAME: 'Returndate', TYPE: 'S'}]
}, function(){ 
    
});
});

            BX24.init(function(){
                BX24.callMethod('entity.add', {
                    'ENTITY': 'librarybook', 
                    'NAME': 'LibraryBook', 
                    'ACCESS': {
                        U1:'W',
                        AU:'R'
                    }
                }, function() {
                    BX24.callMethod('entity.section.add', {ENTITY: 'librarynote', 'NAME': 'newnotes'});
                    BX24.callMethod('entity.section.add', {ENTITY: 'librarynote', 'NAME': 'oldnotes'});
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarybook', 
                        PROPERTY: 'name', 
                        NAME: 'Name', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarybook', 
                        PROPERTY: 'author', 
                        NAME: 'Author', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarybook', 
                        PROPERTY: 'age', 
                        NAME: 'Age', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarybook', 
                        PROPERTY: 'tags', 
                        NAME: 'Tags', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarybook', 
                        PROPERTY: 'count', 
                        NAME: 'Count', 
                        TYPE: 'N'
                    });
                });
                BX24.callMethod('entity.add', {
                    'ENTITY': 'librarynote', 
                    'NAME': 'LibraryNote', 
                    'ACCESS': {
                        U1:'W',
                        AU:'R'
                    }
                }, function() {
                    X24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarynote', 
                        PROPERTY: 'bookid', 
                        NAME: 'BookId', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarynote', 
                        PROPERTY: 'employeeid', 
                        NAME: 'EmployeeId', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarynote', 
                        PROPERTY: 'date', 
                        NAME: 'Date', 
                        TYPE: 'S'
                    });
                    BX24.callMethod('entity.item.property.add', {
                        ENTITY: 'librarynote', 
                        PROPERTY: 'returndate', 
                        NAME: 'Returndate', 
                        TYPE: 'S'
                    });
                });
            });

                BX24.callMethod('entity.add', {
                    'ENTITY': 'librarybook', 
                    'NAME': 'LibraryBook', 
                    'ACCESS': {U1:'W', AU:'R'}
                });

                BX24.callMethod('entity.add', {
                    'ENTITY': 'librarynote', 
                    'NAME': 'LibraryNote', 
                    'ACCESS': {U1:'W', AU:'R'}
                });

                BX24.callMethod('entity.section.add', {ENTITY: 'librarynote', 'NAME': 'newnotes'});
                BX24.callMethod('entity.section.add', {ENTITY: 'librarynote', 'NAME': 'oldnotes'});

                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarybook', 
                    PROPERTY: 'name', 
                    NAME: 'Name', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarybook', 
                    PROPERTY: 'author', 
                    NAME: 'Author', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarybook', 
                    PROPERTY: 'age', 
                    NAME: 'Age', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarybook', 
                    PROPERTY: 'tags', 
                    NAME: 'Tags', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarybook', 
                    PROPERTY: 'count', 
                    NAME: 'Count', 
                    TYPE: 'N'
                });

                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarynote', 
                    PROPERTY: 'bookid', 
                    NAME: 'BookId', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarynote', 
                    PROPERTY: 'employeeid', 
                    NAME: 'EmployeeId', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarynote', 
                    PROPERTY: 'date', 
                    NAME: 'Date', 
                    TYPE: 'S'
                });
                BX24.callMethod('entity.item.property.add', {
                    ENTITY: 'librarynote', 
                    PROPERTY: 'returndate', 
                    NAME: 'Returndate', 
                    TYPE: 'S'
                });






BX24.init(function(){
    BX24.callMethod('entity.add', {
        'ENTITY': 'librarybookqw', 
        'NAME': 'LibraryBook', 
        'ACCESS': {
            U1:'W',
            AU:'R'
        }
    }, function() {
        BX24.callMethod('entity.section.add', {ENTITY: 'librarynoteqw', 'NAME': 'newnotesq'});
        BX24.callMethod('entity.section.add', {ENTITY: 'librarynoteqw', 'NAME': 'oldnotesq'});
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarybookqw', 
            PROPERTY: 'nameq', 
            NAME: 'Name', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarybookqw', 
            PROPERTY: 'authorq', 
            NAME: 'Author', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarybookqw', 
            PROPERTY: 'ageq', 
            NAME: 'Age', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarybookqw', 
            PROPERTY: 'tagsq', 
            NAME: 'Tags', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarybookqw', 
            PROPERTY: 'countq', 
            NAME: 'Count', 
            TYPE: 'N'
        });
    });
    BX24.callMethod('entity.add', {
        'ENTITY': 'librarynoteqw', 
        'NAME': 'LibraryNote', 
        'ACCESS': {
            U1:'W',
            AU:'R'
        }
    }, function() {
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarynoteqw', 
            PROPERTY: 'bookidq', 
            NAME: 'BookId', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarynoteqw', 
            PROPERTY: 'employeeidq', 
            NAME: 'EmployeeId', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarynoteqw', 
            PROPERTY: 'dateq', 
            NAME: 'Date', 
            TYPE: 'S'
        });
        BX24.callMethod('entity.item.property.add', {
            ENTITY: 'librarynoteqw', 
            PROPERTY: 'returndateq', 
            NAME: 'Returndate', 
            TYPE: 'S'
        });
    });
});

b24-g4u7jl.bitrix24.ru


BX24.callMethod('entity.section.add', {
    ENTITY: 'librarynote',
    'NAME': 'other'
}, function(res){ if (typeof(res.answer.result) != "undefined"){ p++; }});

p = 0;
res.answer.result
const interBar = setInterval(function progress() {
    bar = '<progress value="'+ p +'" max="13"></progress>';
    document.getElementById("progBar").innerHTML = bar;
    if (p == 13) {
        clearInterval(intervalId);
        setTimeout(BX24.installFinish(), 1000);
    }
}, 1000);



var toaddbookpicture = $("#toaddbookpicture").val(); 
console.log(toaddbookpicture);
// var name = encodeURI(toaddbookpicture); 
console.log(name); 
var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
name = decodeURI(name); 
console.log(name);