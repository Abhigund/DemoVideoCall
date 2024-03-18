let client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let appId = "1aed17b26a694187a246af0af25c7fdb";
let handleFail = function (err) {
  console.log("Error : ", err);
};

//When a stream is added to a channel
client.on("stream-added", function (evt) {
  client.subscribe(evt.stream, handleFail);
});
//When you subscribe to a stream
client.on("stream-subscribed", function (evt) {
  debugger;
  let stream = evt.stream;
  addVideoStream(stream.getId());
  stream.play(stream.getId());
});
//When a person is removed from the stream
client.on("stream-removed", removeVideoStream);
client.on("peer-leave", removeVideoStream);

// Queries the container in which the remote feeds belong
let remoteContainer = document.getElementById("remote-container");

/**
 * @name addVideoStream
 * @param streamId
 * @description Helper function to add the video stream to "remote-container"
 */
function addVideoStream(streamId) {
  debugger;
  let streamDiv = document.createElement("div"); // Create a new div for every stream
  streamDiv.id = streamId; // Assigning id to div
  streamDiv.style.transform = "rotateY(180deg)"; // Takes care of lateral inversion (mirror image)
  remoteContainer.appendChild(streamDiv); // Add new div to container
}
/**
 * @name removeVideoStream
 * @param evt - Remove event
 * @description Helper function to remove the video stream from "remote-container"
 */
function removeVideoStream(evt) {
  let stream = evt.stream;
  stream.stop();
  let remDiv = document.getElementById(stream.getId());
  remDiv.parentNode.removeChild(remDiv);

  console.log("Remote stream is removed " + stream.getId());
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("start");
  if (button) {
    button.addEventListener("click", function () {
      //   const uid = Math.floor(Math.random() * 10001);
      console.log("1aed17b26a694187a246af0af25c7fdb", "demovideocall", null);
        client.join(appId, "demovideocall", null, async (uid) => {
          console.log("User " + uid + " join channel successfully");
          const localStream = AgoraRTC.createStream({
            audio: true,
            video: true,
            screen: false,
          });
          localStream.init(
            () => {
              console.log("Local stream initialized");
              // localStream.play("me");
              client.publish(localStream, (err) => {
                console.log("Publish local stream error: " + err);
              });
            },
            (err) => {
              console.log("Local stream init failed", err);
            }
          );
        });

      client.on("user-joined", () => {
        console.log("joined");
      });
    });
  }
});
