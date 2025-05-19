document.getElementById("convertForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];
  const format = document.getElementById("formatSelect").value;
  const size = document.getElementById("sizeInput").value;

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("format", format);
  formData.append("size", size);

  document.getElementById("status").innerText = "Converting... Please wait.";

  fetch("http://localhost:5000/convert", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) throw new Error("Conversion failed.");
      return response.blob();
    })
    .then((blob) => {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `converted.${format}`;
      a.click();
      document.getElementById("status").innerText = "Conversion complete! ✅";
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("status").innerText = "❌ Conversion failed.";
    });
});
