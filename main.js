const OpenAI = require('openai');
const openai = new OpenAI({ 
    apiKey: 'YOUR_API_KEY'
});

// Git not letting me push this to GitHub with secret keys in the code. So please insert your key in the code.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


async function getNameReport(name) {
  try {
    const prompt = `Write a detailed report on the person named ${name}. Include information about their background, achievements, and notable facts.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });

    const report = completion.choices[0].message.content.trim();
    console.log(`Report on ${name}:\n${report}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function promptForName() {
    readline.question(`Enter the name you want a report on: `, name => {
      getNameReport(name)
        .then(() => readline.close())
        .catch(error => {
          console.error("An unexpected error occurred:", error);
          readline.close();
        });
    });
}
  
promptForName();