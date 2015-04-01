var image=new Image();
image.src='images/bullets.png'
function reloadGame(){
    window.location.reload()
}

function enableSound() {
    if (document.getElementById('sound').checked) {
        enableMute();
    } else {
        disableMute();
    }
}

function increaseVolume(){
    document.getElementById('audio').volume += 0.1;
}

function decreaseVolume() {
    document.getElementById('audio').volume -= 0.1;
}