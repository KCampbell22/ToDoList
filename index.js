function switchMonth(a) {
  switch (a) {
    case 1:
      return  "January";
      
    case 2:
      return  "February";
      
    case 3:
      return "March";
      
    case 4:
      return "April";
      
    case 5:
      return "May";
      
    case 6:
      return "June";
      
    case 7:
      return "July";
      
    case 8:
      return "August";
      
    case 9:
      return "September";
      
    case 10:
      return "October";
      
    case 11:
      return "November";
      
    case 12:
      return "December";
      
  }
}

var getAndDisplayAllTasks = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=495",
    dataType: "json",
    success: function (response, textStatus) {
      // empty the list
      $("#todo-list").empty();
      var returnActive = response.tasks.filter(function (task) {
        if (!task.completed) {
          return task.id;
        }
      })
      // Display today's date and time at .date-txt
      // example format: June 12, 2022 at 5:12 PM
      var date = new Date();
      var month = date.getMonth() + 1;
      month = switchMonth(month);
      var day = date.getDate();
      var year = date.getFullYear();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var ampm = hour >= 12 ? "PM" : "AM";
      hour = hour ? hour : 12;
      minute = minute < 10 ? "0" + minute : minute;
      var today = `${month} ${day}, ${year} ${hour}:${minute} ${ampm}`;

      
      

           
      $(".date-txt").text(today);
      
      var taskDate = new Date();
      var taskMonth = date.getMonth() + 1;
      taskMonth = switchMonth(taskMonth);
      var taskDay = date.getDate();
      
      var taskStamp = `Completed on ${taskMonth}, ${taskDay}`;

     


      $('.remaining-tasks').text(returnActive.length);
      console.log(returnActive);
      // check if the task is completed

      // loop through the tasks and display them
      response.tasks.forEach(function (task) {
    
        console.log(task);
        $("#todo-list").append(`
        <div class="row task"}">
        <input type="checkbox" class="mark-complete" data-id="${
          task.id
        }" ${task.completed ? "checked" : ""}>
          <p class="${(task.completed ? "task-completed col-xs-5" : "col-xs-5")}">${task.content}</p>
          <p class="task-time-stamp col-xs-5">${(task.completed ? taskStamp : "")}</p>
          <button class="delete" data-id="${task.id}">X</button>
        </div>
        `);
        // check if the task is completed
        // if it is completed add the task-completed class
       
      });
      

      

    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

var createTask = function () {
  $.ajax({
    type: "POST",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=495",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      task: {
        content: $("#new-task-content").val(),
      },
    }),
    success: function (response, textStatus) {
      $("#new-task-content").val();
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

var deleteTask = function (id) {
  $.ajax({
    type: "DELETE",
    url:
      "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
      id +
      "?api_key=495",
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

var markTaskComplete = function (id) {
  $.ajax({
    type: "PUT",
    url:
      "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
      id +
      "/mark_complete?api_key=495",
    dataType: "json",
    success: function (response, textStatus) {
      // check if the task is completed
      // if it is completed add the task-completed class
      response.task.completed = true;
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

var markTaskActive = function (id) {
  $.ajax({
    type: "PUT",
    url:
      "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
      id +
      "/mark_active?api_key=495",
    dataType: "json",
    success: function (response, textStatus) {
      // show the active tasks
      response.task.completed = false;
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

$(document).ready(function () {

  var ammount = [];
  $(document).on("click", ".delete", function () {
    deleteTask($(this).data("id"));
  });

  $("#create-task").on("submit", function (e) {
    e.preventDefault();
    createTask();
  });



  $("#active-btn").on("click", function () {
    $(".task").each(function (i, el) {
      if ($(this).find(".mark-complete").prop("checked")) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("active");
    $(this).removeClass("active");
  });

  $("#completed-btn").on("click", function () {
    // find all the tasks that are checked
    $(".task").each(function (i, el) {
      if ($(this).find(".mark-complete").prop("checked") !== true) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("active");
    $(this).removeClass("active");
  });

  $("#all-btn").on("click", function () {
    $(".task").each(function (i, el) {
      $(this).show();
    });
    $(this).addClass("active");
    $(this).removeClass("active");
  });
  $(document).on("change", ".mark-complete", function () {
    if (this.checked) {

      $(this).parent().addClass("task-completed");
      markTaskComplete($(this).data("id"));
    } else {
      markTaskActive($(this).data("id"));
    }
  });
  // check to see if .mark-complete is checked
  //if it is the background color of the row should be green
  
  getAndDisplayAllTasks();
});

//show completed
