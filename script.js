
$(function(){
    $("#wordle").click(function () { 
        location.reload()        
    });
    $("#continue").click(function () { 
        $(".disclaimer, .dark-film").css("display", "none");
    });
    $("#play_again").click(function () { 
        document.getElementById("box61").innerHTML = ""
        document.getElementById("box62").innerHTML = ""
        document.getElementById("box63").innerHTML = ""
        document.getElementById("box64").innerHTML = ""
        document.getElementById("box65").innerHTML = ""
        $(".display, .dark-film").css("display", "none");
        word = dictionary_bank[Math.floor(Math.random() * dictionary_bank.length)]
        arr = word.split("")
        line = 1
        counter = 0
        counter_box = 0
        selected_id= []
        win = false
        lose = false
        
        $(".key").css("background-color", "var(--grey)");
        $(".key").css("color", "var(--white)");
        $(".box").css("background-color", "var(--black)");
        for(let i = 0; i<6; i++){
            for(let j = 0; j<5; j++){
                document.getElementById("box"+String(j+1)+ String(i+1)).innerHTML = ""
                
            }
        }
    });
    
    function game(x, y){
        $(".display, .dark-film").css("display", "block");
        if (x == true){
            written = "YOU WIN!!!"
        }else{
            written = "YOU LOSE :("
        }
        document.getElementById("written").innerHTML = written
        document.getElementById("the_word").innerHTML = y.toUpperCase()

    }


    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    
    async function checkWordExists(word) {
      try {
        const response = await fetch(url + word);
        if (response.ok) {
          return true
        } else {
          return false
        }
      } catch (error) {}
    }

    dictionary_bank = [
        "river", "music", "sound", "space", "globe", "earth", "light", "voice", 
        "beach", "spoon", "skate", "bloom", "cover", "angel", "smart", "brain", 
        "fruit", "chess", "truth", "young", "pride", "short", "wheat", "north", 
        "south", "blame", "style", "tiger", "horse", "straw", "sword", "clear", 
        "tight", "shine", "start", "flair", "dream", "sight", "frame", "story", 
        "right", "laugh", "pouch", "patch", "doubt", "grasp", "wrist", "grind", 
        "sharp", "flock", "grove", "whirl", "fight", "track", "angle", "brisk", 
        "crane", "daisy", "fresh", "flare", "glory", "quick", "snack", "rival", 
        "cheek", "swarm", "steep", "cling", "proud", "groom", "whale", "thick", 
        "shift", "probe", "spare", "vivid", "sweet", "blink", "jolly", "quilt", 
        "frown", "place", "grace", "stork", "judge", "crisp", "sting", "frail", 
        "drive", "climb", "swift", "blaze", "frank", "hover", "slice", "crown", 
        "pearl", "torch", "hover", "frost", "drill", "slate", "yacht", "smoke", 
        "hover", "piano", "clear", "vivid", "brave", "frail", "creep", "shine", 
        "float", "steep", "hover", "frail", "grove", "blame", "flame", "north", 
        "torch", "angel", "creek", "flare", "pouch", "grain", "glide", "shine", 
        "flock", "blush", "sharp", "hover", "slice", "grove", "smoke", "blaze", 
        "torch", "flare", "pride", "brave", "grove", "swing", "pouch", "blame", 
        "grove", "torch", "hover", "blaze", "shine", "track", "grove", "blame", 
        "creek", "blush", "hover", "torch", "slice", "flame", "grove", "track", 
        "blame", "grove", "blaze", "torch", "frail", "shine", "creek", "flock", 
        "frail", "proud", "hover", "creek", "torch", "creep", "flame", "grove", 
        "blush", "shine", "track", "grove", "flame", "hover", "track", "blame", 
        "slice", "hover", "grove", "track", "shine", "torch", "blaze", "creek", 
        "hover", "blaze", "flame", "creep", "shine", "grove", "slice", "blame", 
        "torch", "creep", "grove", "hover", "blaze", "shine", "track", "grove", 
        "flock", "creep", "torch", "shine", "hover", "track", "grove", "creep", 
        "blaze", "flame", "shine", "hover", "creek", "blush", "grove", "track", 
        "blame", "creek", "torch", "shine", "hover", "track", "grove", "flock", 
        "creek", "torch", "hover", "blaze", "shine", "creep", "track", "grove", 
        "hover", "track", "shine", "creek", "blaze", "torch", "creep", "grove", 
        "track", "shine", "hover", "grove", "track", "creep", "blaze", "torch"
    ];

    
    word = dictionary_bank[Math.floor(Math.random() * dictionary_bank.length)]
    arr = word.split("")
    line = 1
    counter = 0
    counter_box = 0
    selected_id= []
    win = false
    lose = false

    $(".key").click(function () { 
        if(win == false){
            counter++;
            counter_box++
            if(counter_box < 6){
                selected_id.push($(this).attr("id"));
                letter = selected_id[selected_id.length-1]
                document.getElementById("box"+String(line)+String(counter_box)).innerHTML = letter.toUpperCase()
                if(window.getComputedStyle(document.getElementById(selected_id[selected_id.length-1])).backgroundColor !== "rgb(83, 141, 78)" && window.getComputedStyle(document.getElementById(selected_id[selected_id.length-1])).backgroundColor !== "rgb(181, 159, 59)"){
                    $(this).css("background-color", "var(--selected)");
                    $(this).css("color", "var(--grey)");
                }
                counter = selected_id.length
            }
        }
    });
    $("#backspace").click(function () { 
        if(document.getElementById("box"+ String(line)+"1").innerHTML && win == false){
            x = selected_id.pop()
            counter_box--
            for(let i = 0; i< 5; i++){
                document.getElementById("box"+String(line)+String(i+1)).innerHTML = ""
            }
            for(let i = 0; i< selected_id.length; i++){
                document.getElementById("box"+String(line)+String(i+1)).innerHTML = selected_id[i].toUpperCase()
            }
            $("#"+x).css("background-color", "var(--grey)");
            $("#"+x).css("color", "var(--white)");
            for(let i = 0; i<selected_id.length; i++){
                $("#"+selected_id[i]).css("background-color", "var(--selected)");
                $("#"+selected_id[i]).css("color", "var(--grey)");
                
            }
        }
    });
    $("#enter").click(async function () {
        if (selected_id.length > 4 && win == false) {
            input = selected_id.join("")
            const dict = await checkWordExists(input)
            if(dict){
                green = []
                yellow = []
                pattern = []
                for (let i = 0; i < selected_id.length; i++) {
                    let letter = selected_id[i].toLowerCase();
                    if (letter === arr[i]) {
                        $("#" + selected_id[i]).css("background-color", "var(--green)");
                        $("#" + selected_id[i]).css("color", "var(--white)");
                        green.push(i+1)
                        pattern.push("2")
                    } else if (arr.includes(letter)) {
                        $("#" + selected_id[i]).css("background-color", "var(--yellow)");
                        $("#" + selected_id[i]).css("color", "var(--white)");
                        yellow.push(i+1)
                        pattern.push("1")
                    } else {
                        $("#" + selected_id[i]).css("background-color", "var(--selected)");
                        pattern.push("0")
                    }
                }
                for(let i = 0; i<pattern.length; i++){
                    if(pattern[i] == "2"){
                        $("#box"+ String(line) + String(i+1)).css("background-color", "var(--green)");
                    }else if(pattern[i] == "1"){
                        $("#box"+ String(line) + String(i+1)).css("background-color", "var(--yellow)");
                    }else if(pattern[i] == "0"){
                        $("#box"+ String(line) + String(i+1)).css("background-color", "var(--grey)");
                    }
                }
                if(pattern[0] == 2 && pattern[1] == 2 && pattern[2] == 2 && pattern[3] == 2 && pattern[4] == 2){
                    win = true
                    game(win, word)
                }
                if(line == 6 && win != true){
                    game(win, word)
                }
                line++
                counter = 0
                counter_box = 0
                selected_id = []
            }else{
                $("#box"+String(line) + "1").addClass("box-animation");
                $("#box"+String(line) + "2").addClass("box-animation");
                $("#box"+String(line) + "3").addClass("box-animation");
                $("#box"+String(line) + "4").addClass("box-animation");
                $("#box"+String(line) + "5").addClass("box-animation");

                setTimeout(() => {
                    $("#box" + String(line) + "1").removeClass("box-animation");
                    $("#box" + String(line) + "2").removeClass("box-animation");
                    $("#box" + String(line) + "3").removeClass("box-animation");
                    $("#box" + String(line) + "4").removeClass("box-animation");
                    $("#box" + String(line) + "5").removeClass("box-animation");
                }, 1000);
            }
        }
    });

    $("#restart").click(function () { 
        document.getElementById("box61").innerHTML = ""
        document.getElementById("box62").innerHTML = ""
        document.getElementById("box63").innerHTML = ""
        document.getElementById("box64").innerHTML = ""
        document.getElementById("box65").innerHTML = ""
        word = dictionary_bank[Math.floor(Math.random() * dictionary_bank.length)]
        arr = word.split("")
        line = 1
        counter = 0
        counter_box = 0
        selected_id= []
        win = false
        lose = false
        
        $(".key").css("background-color", "var(--grey)");
        $(".key").css("color", "var(--white)");
        $(".box").css("background-color", "var(--black)");
        for(let i = 0; i<6; i++){
            for(let j = 0; j<5; j++){
                document.getElementById("box"+String(j+1)+ String(i+1)).innerHTML = ""
                
            }
        }
    });
})