const API_KEY = config.KEY;

document
  .getElementById("submit-btn")
  .addEventListener("click", async function () {
    // variables to hold the user inputs
    topic = document.getElementById("word-input1").value;
    length = document.getElementById("word-input2").value;
    if (topic == "" || length == "") {
      document.getElementById("error").textContent = "All Inputs Are Required!";
      return;
    } else {
      document.getElementById("error").textContent = "";
    }
    let value1 = `I am trying to make a youtube video but I need some help with making titles. Give me 10 titles, My video is about ${topic}. `;
    titles = await sendToChatGPT(value1, "reply-content1");
    let value2 = `I want you to Think of thumbnails that are catchy and attention-grabbing to use in my youtube videos. I will provide you with 10 Titles, and you will suggest thumbnails for each one. Here are the titles ${titles}.`;
    thumbnails = await sendToChatGPT(value2, "reply-content2");
    let value3 = `Act as a professional YouTube video script writer
  and create an engaging script for a ${length} minute video.
  Think outside the box and come up with a creative, witty,
  and captivating script that people would be interested in watching and sharing.
  Utilize techniques to generate more engagement in the narration script. 
  Create a timeline and stick to it for up to ${length} minutes
  of spoken narration. THE Topic IS: ${topic}`;
    script = await sendToChatGPT(value3, "reply-content3");
    let value4 = `Act as if you're a social media expert. 
  Give me a 10 tweet thread based on the follwing youtube transcript: ${script}. 
  The thread should be optimised for virality and contain 
  hashtags and emoticons. Each tweet should not exceed 280 characters in length.`;
    tweets = sendToChatGPT(value4, "reply-content4");
  });

async function sendToChatGPT(value, container) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: value }],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data.choices[0].message.content);
    document.getElementById(`${container}`).textContent =
      data.choices[0].message.content;
    output = data.choices[0].message.content;
    return output;
  } catch (error) {
    console.log(error);
  }
}
