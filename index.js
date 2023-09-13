const inputText = document.querySelector(".input-text");
const submitBtn = document.querySelector(".translate");
const outputCont = document.querySelector(".output");

const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";

const submitHandler = async () => {
  const encodedText = encodeURI(inputText.value);

  try {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "ae4018746fmshdba8b95361b1d17p16756bjsn2f05ba5ea3b0",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: new URLSearchParams({
        q: encodedText,
        target: "es",
        source: "en",
      }),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      alert("Something went wrong");
      inputText.value = "";
      throw new Error("Something went wrong");
    }

    const result = await response.text();
    const translatedText = decodeURIComponent(
      JSON.parse(result).data.translations[0].translatedText
    );

    outputCont.innerHTML = translatedText;
  } catch (err) {
    console.log(err);
  }
};

submitBtn.addEventListener("click", submitHandler);
