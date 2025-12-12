async function sendData() {
  let jd = document.getElementById("jd").value;
  let file = document.getElementById("cv").files[0];
  let resultBox = document.getElementById("result-box");
  let loading = document.getElementById("loading");

  if (!jd || !file) {
    alert("Please add both a job description and a CV file.");
    return;
  }

  loading.style.display = "block";
  resultBox.style.display = "none";

  let reader = new FileReader();
  reader.onload = async function () {
    let base64 = reader.result.split(",")[1];

    try {
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

      resultBox.innerText = JSON.stringify(result, null, 2);
      resultBox.style.display = "block";

    } catch (err) {
      resultBox.innerText = "⚠ Error contacting backend:\n" + err;
      resultBox.style.display = "block";
    }

    loading.style.display = "none";
  };

  reader.readAsDataURL(file);
}
