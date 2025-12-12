async function sendData() {
  let jd = document.getElementById("jd").value;
  let file = document.getElementById("cv").files[0];

  if (!jd || !file) {
    alert("Please add both a job description and a CV file.");
    return;
  }

  let reader = new FileReader();
  reader.onload = async function () {
    let base64 = reader.result.split(",")[1];

    let response = await fetch(
      "https://ai-resume-ranker-api.agreeablemoss-8b0ec043.uksouth.azurecontainerapps.io/api/rank",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jd: jd,
          cv: base64
        })
      }
    );

    let result = await response.json();
    console.log(result);
    alert("Response received! Check console for details.");
  };

  reader.readAsDataURL(file);
}
