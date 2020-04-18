import React, { useState } from "react";
import { getCompatible } from "../../utils/API"
import "./style.css";

// var comp
var it = 0

function Swipe() {

    function antonio() {
        if(it === comp.length) it = 0   
    
        let card = document.querySelector(".card")
        
        card.style.backgroundImage = `url('${comp[it].imageLink}')`
        card.textContent = `${comp[it].name}`
        it++
    }
    
    
    (function () {
        var animating = false;
    
        function animatecard(ev) {
            if (animating === false) {
                var t = ev.target;
    
                if (t.className === 'but-nope') {
                    t.parentNode.classList.add('nope');
                    animating = true;
                    fireCustomEvent('nopecard', {
                        origin: t,
                        container: t.parentNode,
                        card: t.parentNode.querySelector('.card')
                    });
                }
    
                if (t.className === 'but-yay') {
                    t.parentNode.classList.add('yes');
                    animating = true;
                    fireCustomEvent('yepcard', {
                        origin: t,
                        container: t.parentNode,
                        card: t.parentNode.querySelector('.card')
                    });
                }
    
                if (t.classList.contains('current')) {
                    fireCustomEvent('cardchosen', {
                        container: getContainer(t),
                        card: t
                    });
                }
            }
        }
    
        function fireCustomEvent(name, payload) {
            var newevent = new CustomEvent(name, {
                detail: payload
            });
    
            document.body.dispatchEvent(newevent);
        }
    
        function getContainer(elm) {
            var origin = elm.parentNode;
    
            if (!origin.classList.contains('cardcontainer')) {
                origin = origin.parentNode;
            }
    
            return origin;
        }
    
        function animationdone(ev) {
            animating = false;
            var origin = getContainer(ev.target);
            
            if (ev.animationName === 'yay') {
                origin.classList.remove('yes');
            }
    
            if (ev.animationName === 'nope') {
                origin.classList.remove('nope');
            }
    
            if (origin.classList.contains('list')) {
                if (ev.animationName === 'nope' || ev.animationName === 'yay') {
                    origin.querySelector('.current').remove();
    
                    if (!origin.querySelector('.card')) {
                        fireCustomEvent('deckempty', {
                            origin: origin.querySelector('button'),
                            container: origin,
                            card: null
                        });
                    } else {
                        antonio()
                        origin.querySelector('.card').classList.add('current');
                    }
                }
            }
        }
    
        document.body.addEventListener('animationend', animationdone);
        document.body.addEventListener('webkitAnimationEnd', animationdone);
        document.body.addEventListener('click', animatecard);
        window.addEventListener('DOMContentLoaded', function () {
            document.body.classList.add('tinderesque');
        });
    })();



    const [ comp, setComp ] = useState([{}])

    async function getComps() {

        const symbol = sessionStorage.getItem("symbol")
        const prefrences = sessionStorage.getItem("prefrences")

        console.log(`sym: ${symbol} prefrences:${prefrences}`)
        // await getCompatible(symbol, prefrences).then(data => setComp(data.data))
        //                          .catch(err => console.log(err))
        setComp([{
            fb_ID :"92",
            imageLin: "https://randomuser.me/api/portraits/women/69.jpg",
            name : "LoisKennedy",
            symbol:  "Capricorn",
            gender:  "M",
            prefrenc: "F"
        },
        {
            fb_ID : "597",
            imageLink : "https://randomuser.me/api/portraits/women/6.jpg",
            name : "Gloria Russell",
            symbol : "Libra",
            gender : "F",
            prefrence : "M"
        },
        {
            fb_ID : "872",
            imageLink : "https://randomuser.me/api/portraits/women/14.jpg",
            name : "Pamela Johnston",
            symbol : "Sagittarius",
            gender : "M",
            prefrence : "FM"
        },
        {
            fb_ID : "668",
            imageLink : "https://randomuser.me/api/portraits/men/79.jpg",
            name : "Darrell Smith",
            symbol : "Leo",
            gender : "F",
            prefrence : "FM"
        },
        {
            fb_ID : "353",
            imageLink : "https://randomuser.me/api/portraits/men/41.jpg",
            name : "Marcus Watson",
            symbol : "Gemini",
            gender : "M",
            prefrence : "M"
        },
        {
            fb_ID : "675",
            imageLink : "https://randomuser.me/api/portraits/women/15.jpg",
            name : "Ana Watson",
            symbol : "Aries",
            gender : "M",
            prefrence : "FM"
        },
        {
            fb_ID : "724",
            imageLink : "https://randomuser.me/api/portraits/women/24.jpg",
            name : "Margie Byrd",
            symbol : "Pisces",
            gender : "M",
            prefrence : "M"
        },
        {
            fb_ID : "556",
            imageLink : "https://randomuser.me/api/portraits/women/4.jpg",
            name : "Marlene Jimenez",
            symbol : "Gemini",
            gender : "M",
            prefrence : "FM"
        },
        {
            fb_ID : "841",
            imageLink : "https://randomuser.me/api/portraits/women/35.jpg",
            name : "Stacey Stevens",
            symbol : "Scorpio",
            gender : "F",
            prefrence : "M"
        },
        {
            fb_ID : "443",
            imageLink : "https://randomuser.me/api/portraits/men/51.jpg",
            name : "Ben Gibson",
            symbol : "Sagittarius",
            gender : "M",
            prefrence : "F"
        }])
        antonio()
    }

    getComps()

    return (
        <div class="cardcontainer list"
            style={{
                textAlign: "center",
            }}
        >
            <ul class="cardlist">
                <li class="card current"></li>
                <li class="card"></li>
                <li class="card"></li>
                <li class="card"></li>
                <li class="card"></li>
                <li class="card"></li>
            </ul>
            <button class="but-nope">X</button>
            <button class="but-yay">✔</button>
        </div>
    )
}


export default Swipe;