/*
 * canvas-show-students-total-activity-time.js
 * by: David Lyons hi@lyonsinbeta.com
 * Teachers can already view the Total Active Time for
 * all Students on the People page. This script shows
 * Total Active Time to Students as well.
 */

$(function() {

  if ($.inArray("student", ENV.current_user_roles) > 0) {

    var domain = window.location.hostname;
    var userID = ENV.current_user_id;
    var courseID = ENV.course.id;
    var jsonURL = "https://" + domain + "/api/v1/users/" + userID + "/enrollments";
    var time = "";

    $(function() {
      $("table.roster thead tr th:nth-last-child(2)").after('<th scope="col">Time Active</th>');
    });

    var getTime = $.getJSON(jsonURL, function(data) {

      for (var i = 0; i < data.length; i++) {

        if (data[i].course_id == courseID) {

          time = data[i].total_activity_time;
          }
        }
        
      // Convert total_activity_time from seconds to HH:MM:SS
      time = new Date(time * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];

    });

    var updateTable = getTime.done(function() {

      $("tr#user_46 td:last").html(time);

    });
  }
 });
