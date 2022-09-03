export const gatillo = (client, args, channel, tags, message, self) => {
    try {
      if (args[0] && args[0].startsWith('@')) {
        //chequear logica de args: arriba ya estoy verificando por el arroba, porque aca abajo chequea de nuevo?
        args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
        let user = args[0].toLowerCase();
        let number = Math.floor(Math.random() * 100) + 1;
        console.log(`el numero que salio es ${number}`);
        
        if(number < 49){
            client.say(
                channel,
                `@${tags.username} le dió un gatillazo a @${user}. El arma se trabó y no salió el disparo. MAÑANA FERIADO`
              );
            
            client.timeout(channel, tags.username, 300, `gatillo errado`).then((data) => {
                console.log(`el numero que salio es ${number}`);
                console.log(`el usuairo a banear es ${tags.username}. tags.username`);
            }).catch((err) => {
                console.log(err);
            });
        }
        if(number >= 49 && number < 98){
            client.say(
                channel,
                `@${tags.username} le dió un gatillazo a @${user}. El disparo fue certero.`
              );
            console.log(`el usuairo a banear es ${user}. user`);
            client.timeout(channel, user, 120, `gatillo certero`).then((data) => {
                console.log(`el numero que salio es ${number}`);
                console.log(`el usuairo a banear es ${user}. user`);
            }).catch((err) => {
                console.log(err);
            });

        }
        if(number >= 98 && number <= 100){
            client.say(
                channel,
                `@${tags.username} es tu dia de suerte! Lar se va baneado.`
              );
            client.timeout(channel, "aguslar_", 180, `gatillo que banea a lar`).then((data) => {
                console.log(`el numero que salio es ${number}`);
                console.log(`se banea a lar`);
            }).catch((err) => {
                console.log(err);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };