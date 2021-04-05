export const dados = (client, args, channel, tags, message, self) => {
    let dados = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
    let dadoUno = dados[Math.floor(Math.random() * dados.length)];
    let dadoDos = dados[Math.floor(Math.random() * dados.length)];
    if (dadoUno === dadoDos) {
        let dadoTres = dados[Math.floor(Math.random() * dados.length)];
        let dadoCuatro = dados[Math.floor(Math.random() * dados.length)];
    }
    client.say(
        channel,
        `@${tags.username} tiraste ${dadoUno} ${dadoDos} ${dadoTres ? "y " + dadoTres + " " + dadoCuatro : ""} }`
    );
}