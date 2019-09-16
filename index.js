'use strict';

const axios = require('axios');
const fs = require('fs');

// For local
try {
  fs.statSync('.env');
  require('dotenv').config();
} catch { }

const toggl_api_key   = process.env.TOGGL_API_KEY;
const user_agent      = process.env.USER_AGENT;
const workspace_id    = process.env.WORKSPACE_ID;
const slack_api_url   = process.env.SLACK_API_URL;
const user_list       = process.env.USER_LIST;

const users = user_list.split('$').map((user) => {
  return {
    name: user.split(',')[0],
    toggl_id: user.split(',')[1],
    slack_id: user.split(',')[2],
  }
});

const toggl_base_url  = "https://toggl.com/reports/api/v2/weekly";

const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
  const YYYY  = yesterday.getFullYear();
  const MM    = (yesterday.getMonth() + 1).toString().padStart(2, '0');
  const DD    = yesterday.getDate().toString().padStart(2, '0');

  return `${YYYY}-${MM}-${DD}`;
}

const yesterday = getYesterday();

exports.handler = (event, context) => {
  users.forEach((user) => {
    const user_ids = user.toggl_id;
    const params = { user_agent, workspace_id, yesterday, user_ids };
    const toggl_api_url = toggl_base_url + `?user_agent=${params.user_agent}&workspace_id=${params.workspace_id}&since=${params.yesterday}&user_ids=${params.user_ids}`;

    axios
    .get( toggl_api_url , { headers: { Authorization: `Basic ${toggl_api_key}`}})
    .then((response) => {
      const total = response.data.week_totals[Array.length - 1] / 3600 / 1000;
      const totalHour = Math.floor(total);
      const totalMin  = (total - totalHour) * 60;
      const totalTime = totalHour + ":" + Math.floor(totalMin).toString().padStart(2, '0');;

      if ( total < 7  ) {
          axios
          .post( slack_api_url ,{
            text: `<@${user.slack_id}|${user.name}> Yesterday(${yesterday}), Your Toggl duration was ${totalTime}. \n昨日のTogglの入力時間が7時間を下回っています。`
          })
          .catch((error)=>{
            console.log("Failure posting to slack.");
          })
        }

    })
    .catch((error) => {
      console.log(error);
    });
  })
}
