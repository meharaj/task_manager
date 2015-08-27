var task_id,task_count,doc,done_count;
function init ()
{
	doc = document;
	doc.getElementById('text').addEventListener('keypress',addTodo);
	doc.getElementById('color').addEventListener('keypress',addTodo);
	if(localStorage.getItem('task_counter'))
	{
		task_count = parseInt(localStorage.getItem('task_counter'));
		console.log(task_count);
		if(task_count)
		{
			task_id = task_count ;
		}
		else{
			task_id = 0;
		}
		
	}
	else
	{
		task_count = 0;
		task_id = 0;
	}
	if(task_count)
	{
		for(i=1;i<=task_count;i++)
		{
			var text = localStorage.getItem('task'+i);
			var temp = doc.getElementById('template').innerHTML;
			temp = temp.replace('{{id}}',i);
			temp = temp.replace('fun','rem(event,'+i+')');
			
			temp = temp.replace('{{text}}',text);
			var table = doc.getElementById('todo_table');
			var row = table.insertRow(0);
			var col = row.insertCell(0);
			col.innerHTML = temp;


		}
	}
	if(localStorage.getItem('done_counter'))
	{
		done_count = parseInt(localStorage.getItem('done_counter'));
		if(done_count)
		{
			for(i=1;i<=done_count;i++)
			{
				var text = localStorage.getItem('done'+i);
				var temp = doc.getElementById('template').innerHTML;
				temp = temp.replace('{{id}}',i);
				temp = temp.replace('fun','rem(event,'+i+')');
				
				temp = temp.replace('{{text}}',text);
				var table = doc.getElementById('done');
				var row = table.insertRow(0);
				var col = row.insertCell(0);
				col.innerHTML = temp;


			}
		}
	}
	else
	{
		done_count = 0;
	}
	
}
function rem(event,t_id)
{
	//console.log('erfrg'+id);
	//var t_id = event.target;
	var t = event.target.parentNode.parentNode;
	console.log(t.removeChild(event.target.parentNode));
	//localStorage.removeItem('task'+t_id);
	delete window.localStorage['task'+t_id];
	task_count -=1;
	localStorage.setItem('task_counter',task_count);
	//doc.remo
}



function addTodo(event)
{
	console.log(event);
	if(event.keyCode == 13)
	{	
		var text = doc.getElementById('text').value;
		if(text)
		{
			var color = doc.getElementById('color').value;
			var temp = doc.getElementById('template').innerHTML;
			task_id += 1;
			task_count += 1;
			var row_no = task_count / 2;
			localStorage.setItem('task_counter',task_count);
			localStorage.setItem('task'+task_id,text);
			temp = temp.replace('{{id}}',task_id);
			temp = temp.replace('fun','rem(event,'+task_id+')');
			if(color)
			{
				temp = temp.replace('{{color}}',color);
			}
			else
				{
					temp = temp.replace('{{color}}','yellow');	
				}	
			temp = temp.replace('{{text}}',text);
			var table = doc.getElementById('todo_table');
			var row = table.insertRow(row_no);
			row_no += 1;
			var col = row.insertCell(0);
			col.innerHTML = temp;
			doc.getElementById('text').value = "";
			doc.getElementById('color').value = "";
		}
		
	}
	

}

function drag(event)
{
	event.dataTransfer.setData("text",event.target.id);
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    var done_text = localStorage.getItem('task'+data);
    delete window.localStorage['task'+data];
	task_count -=1;
	done_count +=1;
	localStorage.setItem('task_counter',task_count);
	localStorage.setItem('done'+done_count,done_text);
	localStorage.setItem('done_counter',done_count);
}
function allowDrop(event) {
    event.preventDefault();
}