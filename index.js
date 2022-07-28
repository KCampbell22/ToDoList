
var getAndDisplayAllTasks = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=495",
    dataType: "json",
    success: function (response, textStatus) {
      // empty the list
      $("#todo-list").empty();
      
      // check if the task is completed

    

      // loop through the tasks and display them
      response.tasks.forEach(function (task) {
        console.log(task);
        $("#todo-list").append(`
        <div class="${(task.completed ? "row task task-completed" : "row task")}">
          <p class="col-xs-8">${task.content}</p>
          <button class="delete" data-id="${task.id}">Delete</button>
          <input type="checkbox" class="mark-complete" data-id="${task.id}" ${(task.completed ? "checked" : "")}>
        </div>
        `
        );
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
    $('.task').each(function (i, el) {
      $(this).show();
    })
    $(this).addClass("active");
    $(this).removeClass("active");
  });
  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      $(this).parent().addClass("task-completed");
       markTaskComplete($(this).data('id'));
     } else {
       markTaskActive($(this).data('id'));
     }
   });
  // check to see if .mark-complete is checked
  //if it is the background color of the row should be green
  

  getAndDisplayAllTasks();
});

//show completed
