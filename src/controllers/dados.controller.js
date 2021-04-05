export const dados = (client, args, channel, tags, message, self) => {
    let dados = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:'];
    let dadoUno = dados[Math.floor(Math.random() * dados.length)];
    let dadoDos = dados[Math.floor(Math.random() * dados.length)];
    client.say(
        channel,
        `${dadosUno} ${dadosDos}`
    );
}