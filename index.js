function gbi(id) {return document.getElementById(id)};

let frame = gbi('hiddenImg');
let cardCanvas = gbi('cardCanvas');
let cost = gbi('cost');
let fanart = gbi('fanart');
let subcostFlag = gbi('subcostFlag');
let subcost = gbi('subcost');
let clan = gbi('clan');
let sex = gbi('sex');
let weapon = gbi('weapon');
let attrOne = gbi('attrOne');
let attrTwo = gbi('attrTwo');
let skillText = gbi('skillText');
let suppFlag = gbi('suppFlag');
let suppText = gbi('suppText');
let atkVal = gbi('atkVal');
let suppVal = gbi('suppVal');
let className = gbi('className');
let rng = gbi('rng');
let title = gbi('title');
let subtitle = gbi('subtitle');

let ctx = cardCanvas.getContext('2d');
cardCanvas.width = 715;
cardCanvas.height = 1000;

let fanartImg = new Image();
let fanartFlag = false;

let clanImg = new Image();
let clanFlag = false;

let sexImg = new Image();
let sexFlag = false;

let weaponImg = new Image();
let weaponFlag = false;

let attrOneImg = new Image();
let attrOneFlag = false;

let attrTwoImg = new Image();
let attrTwoFlag = false;

skillText.value = '"The Verge of History" [ACT]: Look at all of your Orbs. ----------------------------------------------------- "Strategy of Hope" [ACT] [1/TURN]: Choose 1 of your Orbs, and destroy it. If you do, you may choose 1 of your Bond cards, and add it in your Orbs. ----------------------------------------------------- "Invisible Ties" [ACT] [1/TURN] [FLIP 2 BONDS]: Draw 2 cards. Choose 2 cards from your hand, and send them to the Retreat Area.';
suppText.value = '[ATK] Attack Emblem';
let skillTextWidth = 55;
let suppTextWidth = 55;

// https://data.whicdn.com/images/279559427/original.jpg
function renderCard() {
    fanartImg.src = fanart.value;
    clanImg.src = 'img/crests/' + clan.value + '.png';
    sexImg.src = 'img/crests/' + sex.value + '.png';
    weaponImg.src = 'img/crests/' + weapon.value + '.png';
    attrOneImg.src = 'img/crests/' + attrOne.value + '.png';
    attrTwoImg.src = 'img/crests/' + attrTwo.value + '.png';

    fanartImg.onload = function() {
        fanartFlag = true;
        tryToDraw();
    }

    clanImg.onload = function() {
        clanFlag = true;
        tryToDraw();
    }

    sexImg.onload = function() {
        sexFlag = true;
        tryToDraw();
    }

    weaponImg.onload = function() {
        weaponFlag = true;
        tryToDraw();
    }

    attrOneImg.onload = function() {
        attrOneFlag = true;
        tryToDraw();
    }

    attrTwoImg.onload = function() {
        attrTwoFlag = true;
        tryToDraw();
    }
}

function tryToDraw() {
    if(fanartFlag && clanFlag && sexFlag && weaponFlag && attrOneFlag && attrTwoFlag) {
        // Draw fanart first
        ctx.drawImage(fanartImg,20,20,675,900);
        ctx.textAlign = 'left';

        // Check to see if subcost is enabled
        if(subcostFlag.checked) {
            ctx.beginPath();
            ctx.arc(65,110,20,0,2*Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.fillStyle = 'grey';
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText(subcost.value, 59, 118);
        }

        // Draw the support text, if any
        let skillOffset = 0;

        if(suppFlag.checked) {
            ctx.font = 'bold 20px monospace';
            let suppTextWords = suppText.value.split(' ');
            let suppTextLines = [''];
            let currentSuppLine = 0;

            for(i=0; i!=suppTextWords.length; i++) {
                if(suppTextLines[currentSuppLine].length + suppTextWords[i].length + 1 < suppTextWidth) {
                    suppTextLines[currentSuppLine] += suppTextWords[i] + ' ';
                } else {
                    suppTextLines.push('');
                    currentSuppLine++;
                    suppTextLines[currentSuppLine] += suppTextWords[i] + ' ';
                }
            }

            let startingSuppLinePos = 780 - (15 * suppTextLines.length);
            ctx.fillStyle = 'black';
            ctx.globalAlpha = 0.75;
            ctx.fillRect(25,startingSuppLinePos-30,665,(15*suppTextLines.length)+(30*1.1));

            ctx.fillStyle = 'white';
            ctx.globalAlpha = 1;
            for(i=0; i!=suppTextLines.length; i++) {
                let heightPos = startingSuppLinePos + (i * 15);

                ctx.fillText(suppTextLines[i],30,heightPos);
            }

            skillOffset = suppTextLines.length;
        }

        // Draw the skill text
        ctx.font = 'bold 20px monospace';
        let skillTextWords = skillText.value.split(' ');
        let skillTextLines = [''];
        let currentSkillLine = 0;

        for(i=0; i!=skillTextWords.length; i++) {
            if(skillTextLines[currentSkillLine].length + skillTextWords[i].length + 1 < skillTextWidth) {
                skillTextLines[currentSkillLine] += skillTextWords[i] + ' ';
            } else {
                skillTextLines.push('');
                currentSkillLine++;
                skillTextLines[currentSkillLine] += skillTextWords[i] + ' ';
            }
        }

        let startingSkillLinePos = 780 - (20 * skillTextLines.length);
        if(suppFlag.checked) {
            startingSkillLinePos -= skillOffset * 30;
        }
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.75;
        ctx.fillRect(25,startingSkillLinePos-30,665,(20*skillTextLines.length)+(30*1.1));

        ctx.fillStyle = 'black';
        ctx.globalAlpha = 1;
        for(i=0; i!=skillTextLines.length; i++) {
            let heightPos = startingSkillLinePos + (i * 20);

            ctx.fillText(skillTextLines[i],30,heightPos);
        }

        // Then draw the frame
        ctx.drawImage(frame,0,0);

        // Then fill the cost
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText(cost.value, 53, 85);

        // Draw the Clan image
        ctx.drawImage(clanImg,54,152);

        // Draw the sex image
        ctx.drawImage(sexImg,54,192)

        // Draw the weapon image
        ctx.drawImage(weaponImg,54,232);

        // Draw the attribute images
        ctx.drawImage(attrOneImg,54,272);
        ctx.drawImage(attrTwoImg,54,312);

        // Draw the point values
        ctx.font = '60px Arial';
        ctx.fillText(atkVal.value,56,888);
        ctx.fillText(suppVal.value,585,888);

        // Draw the RNG value
        ctx.font = '25px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(rng.value,270,894)

        // Draw the class name
        // ctx.fillText(className.value, 530,898);

        let classWidth = ctx.measureText(className.value).width;
        let classWidthMax = 130;

        if(classWidth <= classWidthMax) {
            ctx.fillText(className.value, 530, 894);
        } else {
            ctx.save();
            ctx.scale(classWidthMax / classWidth, 1);
            ctx.fillText(className.value, 530*(1/(classWidthMax/classWidth)), 894);
            ctx.restore();
        }

        // Draw Title
        ctx.font = '45px Arial';
        // ctx.fillText(title.value,650,970);
        let titleWidth = ctx.measureText(title.value).width;
        let titleWidthMax = (715-150)/2;

        if(titleWidth <= titleWidthMax) {
            ctx.fillText(title.value, 650, 970);
        } else {
            ctx.save();
            ctx.scale(titleWidthMax / titleWidth, 1);
            ctx.fillText(title.value, 650*(1/(titleWidthMax/titleWidth)), 970);
            ctx.restore();
        }

        // Draw Subtitle
        ctx.textAlign = 'left';
        let subtitleWidth = ctx.measureText(subtitle.value).width;
        let subtitleWidthMax = (715-150)/2;

        if(subtitleWidth <= subtitleWidthMax) {
            ctx.fillText(subtitle.value, 65, 970);
        } else {
            ctx.save();
            ctx.scale(subtitleWidthMax / subtitleWidth, 1);
            ctx.fillText(subtitle.value, 65*(1/(subtitleWidthMax/subtitleWidth)), 970);
            ctx.restore();
        }

        // Reset flags
        fanartFlag = false;
        clanFlag = false;
        sexFlag = false;
        weaponFlag = false;
        attrOneFlag = false;
        attrTwoFlag = false;
    }
}

window.onload = () => {
    renderCard();
}