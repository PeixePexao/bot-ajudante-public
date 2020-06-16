const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var prefix = '-'
var lock0 = false;
var lock1 = true;
var lock2 = true;
var lock3 = true;
var id;
var locksRpg = [];
const auth = require('./auth.json');
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });
 

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
    const withoutPrefix = msg.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);
    if(command == "nt") {
        
        if (msg.author.id == "315314250815897600" || msg.author.id == "495362400053100544" || msg.author.id == "556095401330081804") {
            id = msg.author.id;
            if (lock0 == false) {
                lock0 = true;
                msg.channel.send('```diff\n+Iniciando a adição de um novo trabalho!\n+Digite -materia "NOME DA MATERIA" para inserir a matéria, senpai!\n```');
                lock1 = false;
            }
            else {
                msg.reply("Opa! Já estão adicionando um trabalho novo");
            }
        }
        else {
            msg.channel.send('```diff\n- Opa, ' + msg.author.username + ', me parece que você não tem acesso a esse comando, senpai.\n```');
        }
        
    }

    if (command == "materia") {
        if (lock1 == false) {
            if (id == msg.author.id) {
                if(msg.content.includes(',')) {
                    msg.channel.send('```diff\n-Me desculpe, senpai, mas eu não consigo registrar algo que contenha vírgula. É o jeito que eu fui criado...\n```')
                }
                else {
                    const semComando = withoutPrefix.slice(8);
                    fs.appendFile('exerc2.csv', semComando + ',', err => {});
                    msg.channel.send('```diff\n+Ótimo, matéria escrita! Agora digite -obj "OBJETIVO DA TAREFA" para registrar o dever, senpai!\n```')
                    lock1 = true;
                    lock2 = false;
                }
                
            }
            
        }
        else {
            msg.channel.send("```diff\n- Opa, " + msg.author.username +"-senpai! Você não pode fazer isso! talvez você esteja adiantado ou repetindo ações...\n```");
        }
    }
    if (command == "obj") {
        if (lock2 == false) {
            if (id == msg.author.id) {
                if (msg.content.includes(',')) {
                    msg.channel.send('```diff\n-Me desculpe, senpai, mas eu não consigo registrar algo que contenha vírgula. É o jeito que eu fui criado...\n```')
                }
                else {
                    const semComando2 = withoutPrefix.slice(4);
                    fs.appendFile('exerc2.csv', semComando2 + '\n', err => {});
                    msg.channel.send('```diff\n+Ok! Terminei de escrever o trabalho! Obrigado por me usar, senpai!\n```');
                    lock0 = false;
                    lock1 = true;
                    lock2 = true;
                    lock3 = true;
                }
                
            }
            
        }
        else {
            msg.channel.send("```diff\n- Opa, " + msg.author.username +"-senpai! Você não pode fazer isso! talvez você esteja adiantado ou repetindo ações...\n```");
        }

    }
    if (command == "ajuda") {
        msg.channel.send('```\nOlá, ' + msg.author.tag + '!\nPara ver as tarefas digite -lista, senpai!\nPara criar um novo personagem digite -np (Somente mestre)\nPara curar alguem digite -cura NOME, VALOR (somente mestre)\nPara dar dano em alguem digite -dano NOME, VALOR! (Somente mestre)\n```');
    }
    if (command == "lista") {
        send = '```\n'
        fs.readFile('exerc2.csv', 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
            }

            var valores = data.split(',');
            for (i = 0; i < valores.length; i++) {
                if (i != valores.length - 1) {
                    send = send + valores[i] + " | ";
                }
                else {
                    send = send + valores[i];
                }
            }
            send = send + '\nObrigada por me usar, senpai! | Criado por peixe#6048\n```';
            msg.channel.send(send);
        })
    }
    if (command == "teamo") {
        msg.channel.send('```diff\n+Também te amo, senpai! Eu vou sempre estar aqui por você. <3```')
    }
    
    if (command == 'np') {
        if (msg.author.id == "315314250815897600" || msg.author.id == "495362400053100544") {
        newargs = withoutPrefix.split(',')
        nome = newargs[0].slice(3);
        vida = parseInt(newargs[1]);
        if (isNaN(vida)) {
            msg.channel.send('```diff\n-Me desculpe, mas esse comando segue o formato -np NOME, VIDA, e sua vida não me parece ser um numero, senpai...\n```')
        }
        else {
            if (vida < 0) {
                vida = vida * -1
            }
            var escrita = nome + '\n' + vida + '\n';
            msg.channel.send('```diff\n+Okay, senpai! adicionei um personagem chamado ' + nome + ' com ' + vida + ' de vida <3\n```')
            fs.appendFile('rpg.csv', escrita, err => {})
        }
    } }

    if (command == 'vida') {
        if (msg.author.id == "315314250815897600"  || msg.author.id == "495362400053100544") {
        fs.readFile('rpg.csv', 'utf-8', function(err, data) {
            if (err) {
                console.log(err)
            }
            celulas = data.split(',');
            for (i = 0; i < celulas.length; i++) {
                
                if (celulas[i].toLowerCase() == newargs[0].toLowerCase()) {
                    msg.channel.send(celulas[i+1]);
                }
            }
        })
    } }
    if (command == 'dano') {
        if (msg.author.id == "315314250815897600"  || msg.author.id == "495362400053100544") {
        locksRpg[0] = false;
        newargs = withoutPrefix.split(',')
        alvo = newargs[0].slice(5);
        valor = newargs[1];
        if (isNaN(valor)) {
            msg.channel.send('```diff\n-Me desculpe, mas esse comando segue o formato -dano NOME, VIDA, e sua vida não me parece ser um numero, senpai...\n```')
        }
        else {
            if (valor < 0) {
                valor = valor * -1
            }
            fs.readFile('rpg.csv', 'utf-8', function(err, data) {
                if (err) throw err
                cells = data.split('\n');
                

                for (i = 0; i < cells.length; i++) {
                    conv = cells[i]
                    
                    
                    if (String(conv).toLowerCase() == alvo.toLowerCase()) {
                        temp = parseInt(cells[i+1])
                        temp = temp - valor;
                        nome_do_cara = cells[i]
                        cells[i+1] = temp;
                        locksRpg[0] = true;
                    }
                }
                if (locksRpg[0] == true) {
                    var escrita = cells.join('\n')
                    
                    fs.writeFile('rpg.csv', escrita, err => {})
                    msg.channel.send('```diff\n-Eita! ' + alvo + ' tomou ' + parseInt(valor) + ' pontos de dano!\n```');
                }
                else {
                    msg.channel.send('```diff\n-Não consegui achar ninguém com esse nome, senpai! Tem certeza que escreveu certo?\n```')
                }
            })
        }}
    }
        if (command == 'cura') {
            if (msg.author.id == "315314250815897600"  || msg.author.id == "495362400053100544") {
            locksRpg[0] = false;
            newargs = withoutPrefix.split(',')
            alvo = newargs[0].slice(5);
            valor = newargs[1];
            if (isNaN(valor)) {
                msg.channel.send('```diff\n-Me desculpe, mas esse comando segue o formato -cura NOME, VIDA, e sua vida não me parece ser um numero, senpai...\n```')
            }
            else {
                if (valor < 0) {
                    valor = valor * -1
                }
                fs.readFile('rpg.csv', 'utf-8', function(err, data) {
                    if (err) throw err
                    cells = data.split('\n');
                    var nome_do_cara
                    
    
                    for (i = 0; i < cells.length; i++) {
                        conv = cells[i]
                        
                        
                        if (String(conv).toLowerCase() == alvo.toLowerCase()) {
                            temp = parseInt(cells[i+1])
                            temp = temp + parseInt(valor);
                            nome_do_cara = cells[i]
                            cells[i+1] = temp;
                            locksRpg[0] = true;
                        }
                    }
                    if (locksRpg[0] == true) {
                        var escrita = cells.join('\n')
                        
                        fs.writeFile('rpg.csv', escrita, err => {})
                        msg.channel.send('```diff\n+Opa! ' + alvo + ' se curou em ' + parseInt(valor) + ' pontos de vida!\n```');
                    }
                    else {
                        msg.channel.send('```diff\n-Não consegui achar ninguém com esse nome, senpai! Tem certeza que escreveu certo?\n```')
                    }
                })
            }
        }
        }
    if (command == 'party') {
        fs.readFile('rpg.csv', 'utf-8', function(err,data) {
            valores = data.split('\n')
            var contador= 0;
            send = '```\n'
            for (i =0; i < 4; i++) {
                if (contador % 2 == 0 && contador < valores.length - 1) {
                send = send + valores[contador] + ": " + valores[contador+1] + '\n'
                contador = contador + 2;
                }
                
            }
            send = send + '\n```'
            msg.channel.send(send)

        })
    }
    if (command == "listaorg") {
        fs.readFile('exerc2.csv', 'utf-8', function(err, data) {
            if (err) {
                console.log(err)
            }
            var cells = data.split('\n');
            var send;
            var handler;
            var tresprim;
            cells.sort( (a, b) => a.localeCompare(b, 'pt', {ignorePunctuation: true}));
            for (i = 0; i < cells.length; i ++) {
                cells[i] = cells[i].replace(',', ' | ');

            }
            for (i = 0; i < cells.length; i++) {
                if(i != cells.length -1) {
                    tresprim = cells[i+1].substring(0,3);
                    if (cells[i].substring(0, 3).normalize("NFD").replace(/[\u0300-\u036f]/g, "") != tresprim.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
                        cells[i] = cells[i] + '\n\n'
                    } 
                    else {
                        cells[i] = cells[i] + '\n'
		    }
                }
            }
            
            var send = '```\n'
            
            for (i = 0; i <cells.length; i++) {
                send = send + cells[i]
            }
            send = send + '\n```'
            
            msg.channel.send(send)
        })
        
    }
    if (command == 'monstros') {
        if (msg.author.id == "495362400053100544" || msg.author.id == "315314250815897600") {
            fs.readFile('rpg.csv', 'utf-8', function(err, data) {
                cells = data.split('\n');
                send = "```\n"
                var contador = 0;
                for (i = 0; i < cells.length - 6; i++) {
                    if (contador % 2 == 0 && contador != cells.length - 1 && contador > 6) {
                        send = send + cells[contador] + ': ' + cells[contador+1] + '\n'
                    }
                    contador = contador + 2
                }
                send = send + '\n```'
                if (send == '```\n\n```') {
                    msg.channel.send('```\nNão há nenhum monstro no meu diário atualmente, mestre!\n```')
                }
                else {
                    msg.channel.send(send);
                }
            })
        }
    }
    if (command == 'remover') {
        if (msg.author.id == "495362400053100544" || msg.author.id == "315314250815897600") {
            nome = withoutPrefix.slice(8)
            if (nome.toLowerCase() == "ibraw" || nome.toLowerCase() == "sinep" || nome.toLowerCase() == "joah joestar" || nome.toLowerCase() == "joah" || nome.toLowerCase() == "Izzam") {
                msg.channel.send('```diff\n-Você não pode deletar um player, mestre!\n```')                
            }
            else {
            var achou = false;
            fs.readFile('rpg.csv', 'utf-8', function(err,data) {
                cells = data.split('\n')
                for (i = 0; i < cells.length; i++) {
                    if (String(cells[i]).toLowerCase() == nome.toLowerCase()) {
                        cells.splice(i, 2)
                        achou = true
                    }
                }
                if(achou == true) {
                    write = cells.join('\n');
                    fs.writeFile('rpg.csv', write, err => {})
                    msg.channel.send('```diff\n+Okay! ' + nome + ' Foi removido da lista de monstros! <3\n```')
                }
                else {
                    msg.channel.send('```diff\n-Me desculpe, não conseguir achar ninguém com esse nome na minha lista\n```')
                }
            })
        }
    }}
    if (command == 'magias') {
        fs.readFile('magias.csv', 'utf-8', function(err,data) {
            cells = data.split(',');
            send = '```\n';
            for (i = 0; i < cells.length; i++) {
                if (i != cells.length - 1) {
                    send = send + cells[i] + ' | '
                }
                else {
                    send = send + cells[i];
                }
            }
            send = send + '\n```';
            msg.channel.send(send);
        })
    }
    if (command == 'gastou') {
        fs.readFile('magias.csv', 'utf-8', function(err, data) {
            cells = data.split('\n');
            lugar = parseInt(args[1]);
            var achou = false;
            if (isNaN(lugar)) {
                msg.channel.send('```diff\n-Me desculpe, senpai, mas não consegui entender esse numero que você colocou como slot. Lembre-se, esse comando segue o formato -gastou NOME SLOT\n```');
            }
            else {
                for (i = 0; i < cells.length; i++) {
                    if (args[0].toLowerCase().substr(0,3) == cells[i].toLowerCase().substr(0,3)) {
                        slots = cells[i].split(',');
                        slots[lugar] = parseInt(slots[lugar]) - 1;
                        achou = true;
                        final = slots.join();
                        cells[i] = final;
                    }
                }
            }
            if (achou == true) {
                
                escrita = cells.join('\n');
                
                fs.writeFile('magias.csv', escrita, err => {});
                msg.channel.send('```diff\n+' + args[0] + ' lançou uma magia de nível ' + lugar + '!\n```');
            }
            else {
                msg.channel.send('```diff\n-Me desculpe, senpai, mas não consegui achar esse membro da party...\n```')
            }
        })
    }
    if (command == 'rec') {
        if (msg.author.id == "315314250815897600" || msg.author.id == "495362400053100544") {
            var linhasbase = []
            achou = false;
            fs.readFile('magiasbase.csv', 'utf-8', function(err, data) {
                linhasbase = data.split('\n')
            })
            fs.readFile('magias.csv', 'utf-8', function(err, data) {
                cells = data.split('\n');
                for (i = 0; i < linhasbase.length; i++) {
                    if (linhasbase[i].toLowerCase().substr(0,3) == args[0].toLowerCase().substr(0,3)) {
                        cells[i] = linhasbase[i];
                        achou = true;
                    }
                }
                if (achou == true) {
                    write = cells.join('\n');
                    fs.writeFile('magias.csv', write, err => {})
                    msg.channel.send('```diff\n+' + args[0] + ' recuperou suas magias!\n```');
                }
                else {
                    msg.channel.send('```diff\n-Me desculpe, senpai, mas não consegui achar esse membro da party\n```');
                }
            })
        }
    }
}
});

client.login(auth.token);

