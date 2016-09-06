/**
 * Created by stream on 4/13/16.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomChoice(array){
	return array[ getRandomInt(0, array.length) ];
}