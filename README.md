# TogglAttentionOnSlack
Slack bot which send message if user's Toggl duration is shorter than any time. This node.js code is supposed to be deployed in AWS Lambda with environment variables. This repository is a set of code which work in local environment. The code supposed to be deployed is only ```index.js```. Please copy the code on the AWS Lambda console. 
<img src="https://github.com/yaberah/TogglAttentionOnSlack/blob/images/image1.png" width="500px" alt="ExpamleImage">

## How to  use
``` 
1. Open index.js and copy all codes.
2. Paste the code on AWS Lambda function console.
3. Setting environmental variables like below.
4. Setting AWS Cloudwatch trigger, as you like.
```

If you want to test or development in local, pull this repository and make the ```.env``` file which define the environmental variables. (ex. ```.env_example``` ) When you test the code in local, the driver file ```text.js``` will help.

## Environmental variables
| Environmental variables | description |
----|---- 
| TOGGL_API_KEY | API key of Toggl, confirm your key https://toggl.com/app/profile API TOKEN. |
| USER_AGENT | The name of your application or your email address resistered Toggl. |
| WORKSPACE_ID | The Toggl workspace ID you want to use, see https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md  |
| SLACK_API_URL | Slack bot API url you want to post. |
| USER_LIST | Set Slack account name, Toggl user ID, Slack user ID, with ```$``` and ```,``` like below. You can get Slack ID with Slack API; users.list  <br><br>ex.) Two users <br> [username],[123456],[ABCDEFG]$[username],[123456],[ABCDEFG] |
| THRETHOLD_TIME | If time is shorter than this time, alert on Slack. |

## Reference 
- toggl_api_docs https://github.com/toggl/toggl_api_docs

## License
MIT
