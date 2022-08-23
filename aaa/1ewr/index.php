<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="//api.bitrix24.com/api/v1/"></script>
    <link rel="stylesheet" href="css/main.css">
    <title>Document</title>
</head>
<body>
    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'NotesTab');" id="defaultOpen">Записи</button>
        <button class="tablinks" onclick="openTab(event, 'LibTab');">Список книг</button>
    </div>

    <div id="NotesTab" class="tabcontent">
        <input type="button" onclick="document.getElementById('formInput').style.display='block'; showAcBooks(); setDate();" value="Добавить">
        <input type="button" onclick="editNotes();" value="Редактировать">
        <div>
            <input onclick="showNotes('newnotes');" value="Текущие" type="button">
            <input onclick="showNotes('oldnotes');" value="История" type="button">
        </div>
        <div id="formInput" class="forminput">
            <div id="formContent" class="formcontent">
                <h4>Ввод</h4>
                <input id="locuser" onclick="pickUser();" type="text" placeholder="Выберите сотрудника">
                <div id="mainselect"></div>
                <input type="datetime-local" id="todaydate" name="date"/>
                <input type="datetime-local" id="returndate" name="date"/>
                <input type="button" onclick="addNote();" value="Добавить">
                <div id="itemErr"></div>
            </div>
        </div>
        <div id="notes">
            
        </div>
    </div>
    
    <div id="LibTab" class="tabcontent">
        <input type="button" onclick="addBooks();" value="Добавить">
        <input type="button" onclick="editBooks();" value="Редактировать">
        <div id="formInputSec" class="forminputsec" style="display: none;">
            <input id="toaddbookname" type="text" placeholder="Название">
            <input id="toaddbookdescription" type="text" placeholder="Описание">
            <input id="toaddbookauthor" type="text" placeholder="Автор">
            <input id="toaddbookage" type="text" placeholder="Год">
            <input id="toaddbookcategory" type="text" placeholder="Категория">
            <input id="toaddbookISBN" type="text" placeholder="ISBN">
            <textarea id="toaddbooktag" rows="2" cols="30" name="text" placeholder="Теги"></textarea>
            <input id="toaddbookcount" type="number" placeholder="Кол-во">
            <input id="toaddbookpicture" type="file" placeholder="Обложка">
            <input type="button" onclick="addBook();" value="Добавить">
        </div>
        <select id="filterBookSelect">
            <option selected value=" ">Выберите сортировку</option>
            <option value="1">Название</option>
            <option value="2">Автор</option>
            <option value="3">Теги</option>
        </select>
        <input id="filterBookText" type="text" placeholder="Поиск">
        <input type="button" onclick="filterBooks();" value="Отфильтровать">
        <div id="books">
            
        </div>
        <div id="formInEdBook" class="forminedbook">
            
        </div>
    </div>
    <script type="text/javascript" src="js/jQuery.js"></script>
    <script type="text/javascript" src="js/sub.js"></script>
    <!-- <script src="//api.bitrix24.com/api/v1/"></script> -->
    <script type="text/javascript" src="js/main.js"></script>
    <script>
	
        $(document).ready(function () {
            showNotes('newnotes');
            showBooks();
        });
    
    </script>
</body>
</html>