// interact with stars

function interactThing(code) {

    var object, mission;

    mission = getCookie('mission');

    // OBJECTS TO USE AND CHANGE SITE

    if (code == 'booth') {

        if (useObject('id')) {
            portalTo('outside_roundabout');
        }

    } else if (code == 'turnstile') {

        if (useObject('id')) {
            portalTo('aisle_to_containment');
        }

    } else if (code == 'reader') {

        if (useObject('card')) {
            portalTo('laboratory');
        }

    // JUST CHANGE SITE

    } else if (code == 'door') {

        object = 'ppes';

        if (hasObject(object)) {
            portalTo('monitor');
        } else {
            interactPerson('Sergio');
        }

    } else if (code == 'console') {

        portalTo('console');

    } else if (code == 'manual') {

        window.history.pushState("", "", "/html/objects/manual.html");
        window.location.reload();

    } else if (code == 'computer') {

        if (mission == 'computer') {
            window.history.pushState("", "", "/html/sites/computer.html");
            window.location.reload();
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    // OBJECTS TO USE AND SHOW MESSAGE

    } else if (code == 'turbine') {

        if (mission == 'turbine') {
            object = 'fuse';
            if (useObject(object)) {
                interactPerson('Workers');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'valve') {

        if (mission == 'calibrate') {
            object = 'lubricant';
            if (useObject(object)) {
                showMessage('Well done, the ' + code + ' can be moved again. Report to your BOSS inmediately.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'channel') {

        if (mission == 'calibrate') {
            object = 'thermocouple';
            if (useObject(object)) {
                showMessage('Well done, you measured the inlet ' + code + ' temperature. Report to your BOSS inmediately.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'core') {

        if (mission == 'loading') {
            object = 'assembly';
            if (useObject(object)) {
                setCookie('alarm', true);
                activateAlarm();
                showMessage('Oh, no! The ' + code + ' is reaching criticality. Report to your BOSS inmediately.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'pool') {

        if (mission == 'boron') {
            object = 'boron';
            if (useObject(object)) {
                showMessage('Well done, the ' + object + ' concentration is rising, it absorbs neutrons. Report to your BOSS inmediately.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'switch') {

        object = 'fuse';
        if (mission == 'turbine' && isObjectUsed(object)) {
            if (! isObjectUsed(code)) {
                if (confirm('Do you really want to turn the ' + code + ' on?')) {
                    setCookie('switch_used', true);
                    showMessage('Well done, you ' + code + ' on the main substation. Report to your BOSS inmediately.');
                }
            } else {
                showMessage('The ' + code + ' is already on.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'crawler') {

        if (mission == 'cask') {
            object = 'key';
            if (useObject(object)) {
                showMessage('Well done, the cask can be moved to the dry cask storage site. Report to your BOSS inmediately.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    // OBJECTS TO PICK AND SHOW MESSAGE

    } else if (code == 'assembly') {

        if (mission == 'loading' && ! isObjectUsed(code)) {
            if (pickObject(code)) {
                showMessage('Gordon: Do you think this is Doraemon\'s pocket?');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'lambda') {

        if (pickObject(code)) {
            showMessage('Carles: Congratulations! You found the easter egg.');
        }

    } else if (code == 'thermocouple') {

        if (mission == 'calibrate' && ! isObjectUsed(code)) {
            if (pickObject(code)) {
                interactPerson('Luisfe');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'ppes') {

        if (mission == 'loading') {
            if (pickObject(code)) {
                showMessage('Sergio: With the PPEs you can now enter the reactor containment.');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else if (code == 'boron') {

        if (mission == 'boron' && ! isObjectUsed(code)) {
            if (pickObject(code)) {
                interactPerson('Eli');
            }
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    // JUST SHOW MESSAGE

    } else if (code == 'scram') {

        if (mission == 'criticality') {
            setCookie('scram_used', true);
            setCookie('alarm', false);
            activateAlarm();
            showMessage('Well done, all control rods are now fully inserted, the core is subcritical again. Report to your BOSS inmediately.');
        } else {
            showMessage('Gordon: I don\'t have time for this now.');
        }

    } else {
        alert('Error 040. Thing code ' + code + ' not recognized.');
    }

}

// interact with people

function interactPerson(code) {

    var object, mission;

    mission = getCookie('mission');

    if (code == 'Alex') {

        showMessage(code + ': This is a fuel assembly, inside these rods there are uranium pellets that make possible fission when placed into the reactor.');

    } else if (code == 'Alfonso') {

        showMessage(code + ': Python sucks, C++ and C# rules!');

    } else if (code == 'Ana') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, this is not the way to the control room.');
        } else if (mission == 'calibrate') {
            object = 'lubricant';
            if (hasObject(object) || isObjectUsed(object)) {
                showMessage(code + ': I don\'t have more ' + object + '. By the way, can I be your financial assistant?');
            } else {
                showMessage(code + ': Take this ' + object + ', a good engineer always needs some.');
                pickObject(object);
            }
        } else {
            showMessage(code + ': I know everything about nuclear insurance, ask me anything if you dere.');
        }

    } else if (code == 'Antonio') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, this is not the way to the control room.');
        }
        else if (mission == 'cask') {
            object = 'key';
            if (isObjectUsed(object)) {
                showMessage(code + ': Thanks for the key, now I can move the cask to the dry cask storage site.');
            } else {
                showMessage(code + ': I lent the ' + object + ' to Carles, without it the crawler won\'t move.');
            }
        } else {
            showMessage(code + ': I work with sodium cooled reactors.');
        }

    } else if (code == 'Carles') {

        if (mission == 'prelude') {
            showMessage(code + ': Yes, that\'s the door to the control room. Come back here often, I\'ll give you good information.');
        } else if (mission == 'turbine') {
            showMessage(code + ': You better check what the guys are doing with the turbine, then don\'t forget to switch the power on in the substation.');
        } else if (mission == 'cask') {
            object = 'key';
            if (hasObject(object) || isObjectUsed(object)) {
                showMessage(code + ': I don\'t have more ' + object + 's. By the way, do you like Python?');
            } else {
                showMessage(code + ': Take this ' + object + ', Antonio may need it for the crawler.');
                pickObject(object);
            }   
        } else if (mission == 'calibrate') {
            object = 'thermocuple';
            if (isObjectUsed(object)) {
                showMessage(code + ': The valve for the reactor coolant system? I think it is somewhere near the turbine hall.');
            } else {
                showMessage(code + ': You\'ll find the inlet channel if you go outside and then at the roundabout you go left.');
            }
        } else if (mission == 'loading') {
            object = 'assembly';
            if (hasObject(object)) {
                showMessage(code + ': Go to the containment area, Sergio is always whatching the door.');
            } else {
                showMessage(code + ': Find a fuel assembly to complete the reload process. Ask Alex, he\'s the fuel guy.');
            }
        } else if (mission == 'criticality') {
            showMessage(code + ': Son, you better activate the SCRAM in the control room.');
        } else if (mission == 'boron') {
            object = 'boron';
            if (hasObject(object)) {
                showMessage(code + ': Add the boron to the reactor pool, it reduced the fission rate.');
            } else {
                showMessage(code + ': Ask Eli in the chemical laboratory, she\'ll know what to do. Did you notice the olive tree in front of the laboratory. It\'s beautiful, isn\'t it?');
            }
        } else {
            showMessage(code + ': Your password? How am I supposed to know that Gordon? May be, if you think out of the box. Try to have a look to the source code or look it from another angle.');
        }

    } else if (code == 'Charlie') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, this is the way to the dry cask storage.');
        } else if (mission == 'cask') {
            object = 'key';
            if (isObjectUsed(object)) {
                showMessage(code + ': Thanks Gordon, you saved the day again. Report to your BOSS inmediately.');
            } else {
                showMessage(code + ': Well... Antonio missed the key again.');
            }
        } else {
            showMessage(code + ': I am just watching Antonio.');
        }

    } else if (code == 'Eli') {

        if (mission == 'boron') {
            if (hasObject('boron')) {
                showMessage(code + ': Boron is used as a strong neutron absorber, that is, you can stop the chain reaction with it since it absorbs neutrons that won\'t produce more fissions.');
            } else {
                showMessage(code + ': I am preparing some concentrated solution with boric acid, it may be useful.');
            }
        } else {
            showMessage(code + ': So you got the card, uh? By the way, I like unicorns and rainbows.');
        }

    } else if (code == 'Gumer') {

        if (mission == 'turbine') {
            showMessage(code + ': Did you try the new restaurant in downtown?');
        } else if (mission == 'cask') {
            showMessage(code + ': I\'ve been in more than 87 countries.');
        } else if (mission == 'calibrate') {
            showMessage(code + ': Did you read my last paper? It\'s awesome.');
        } else if (mission == 'loading') {
            showMessage(code + ': You don\'t know how to solve the transport equation with Methods of Characteristics? That\'s for newbies.');
        } else if (mission == 'criticality') {
            showMessage(code + ': Did you try Kobe beef? I did.');
        } else if (mission == 'boron') {
            showMessage(code + ': I need more students for my master. Do you want to enroll in it?');
        } else {
            showMessage(code + ': I have a conference in Australia next month.');
        }

    } else if (code == 'Irene') {

        if (mission == 'prelude') {
            showMessage(code + ': If you go ahead you\'ll find to the containment area.');
        } else if (mission == 'turbine') {
            showMessage(code + ': Oh no, the turbine is not working. Do something Gordon!.');
        } else if (mission == 'cask') {
            showMessage(code + ': Oh no, the crawler is not moving. Do something Gordon!.');
        } else if (mission == 'calibrate') {
            showMessage(code + ': Oh no, the inlet water temperature is not working properly. Do something Gordon!.');
        } else if (mission == 'loading') {
            showMessage(code + ': Oh no, we still need one more fuel assembly for a full reload. Do something Gordon!.');
        } else if (mission == 'criticality') {
            showMessage(code + ': Oh no, the core is reaching criticality. Do something Gordon!.');
        } else if (mission == 'boron') {
            showMessage(code + ': Oh no, the boron level is too low. Do something Gordon!.');
        } else {
            showMessage(code + ': What? ...');
        }

    } else if (code == 'Jaime') {
        
        if (mission == 'loading') {
            object = 'assembly';
            if (isObjectUsed(object)) {
                showMessage(code + ': The alarm went off because the core is reaching criticality, I know it well, I\'m instructor man.');
            } else {
                showMessage(code + ': We only need one fuel assembly to finalize the reload process.');
            }
        } else if (mission == 'criticality') {
            showMessage(code + ': The alarm went off because the core is reaching criticality, I know it well, I\'m instructor man.');
        } else if (mission == 'boron') {
            object = 'boron';
            if (isObjectUsed(object)) {
                showMessage(code + ': Gordon you are awesome.');
            } else {
                showMessage(code + ': The boron level is too low. You better add some boron to the reactor pool.');
            }
        } else {
            showMessage(code + ': I am in love with crossfit.');
        }

    } else if (code == 'Josep') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, I am not Your BOSS, he is just behind me.');
        } else if (mission == 'computer') {
            showMessage(code + ': Gordon, your computer is just in front of me, you know that right?. Your user name is your last name, all in lower case.');
        } else {
            showMessage(code + ': Did you study all these manuals? Yes, you can have a look, they are just in front of me. I want to be a nuclear operator when I grow up.');
        }

    } else if (code == 'Luisfe') {

        if (mission == 'calibrate') {
            object = 'thermocouple';
            if (hasObject(object)) {
                showMessage(code + ': Nice, you found my thermocouple. Wait, you say it\'s yours... are you sure?');
            } else {
                showMessage(code + ': I lost my thermocouple somewhere around here. Can you help me to find it out?');
            }
        } else {
            showMessage(code + ': Yes, ahead is the way to the control room; no, to the right you have the turbine. But Gordon, you already know that, right?');
        }

    } else if (code == 'Miguel') {

        if (mission == 'turbine') {
            showMessage(code + ': Carles, do you want to learn WordPress?');
        } else if (mission == 'cask') {
            showMessage(code + ': Carles, we have a new post in our page.');
        } else if (mission == 'calibrate') {
            showMessage(code + ': Carles, did you break WordPress configuration again?');
        } else if (mission == 'loading') {
            showMessage(code + ': Carles, the hosting subscription ends next week.');
        } else if (mission == 'criticality') {
            showMessage(code + ': Carles, do you have time to write a new post?');
        } else if (mission == 'boron') {
            showMessage(code + ': Carles, did you try this new plugin?');
        } else {
            showMessage(code + ': I am more into BWR, they are more efficient.');
        }

    } else if (code == 'Pablo') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, this is the way to the control room.');
        } else if (mission == 'turbine') {
            object = 'fuse';
            if (hasObject(object) || isObjectUsed(object)) {
                showMessage(code + ': I already gave you my ' + object + '. By the way, do you drink lot of coffee?');
            } else {
                showMessage(code + ': Take this spare ' + object + ', you never know when you\'ll need one.');
                pickObject(object);
            }
        } else {
            showMessage(code + ': The chemical formula for caffeine is C8H10N4O2, and its name is 1,3,7-trimethylxanthine for short or the complete name 3,7-dihydro-1,3,7-trimethyl-1H-purine-2,6-dione.');
        }

    } else if (code == 'Paco') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, the control room is to the right.');
        } else if (mission == 'turbine') {
            showMessage(code + ': Just if I had a fuse...');
        } else if (mission == 'cask') {
            showMessage(code + ': Just if I had the crawler\'s keys...');
        } else if (mission == 'calibrate') {
            showMessage(code + ': Just if I had a thermocouple...');
        } else if (mission == 'loading') {
            showMessage(code + ': Just if I had a fuel assembly...');
        } else if (mission == 'criticality') {
            showMessage(code + ': Just if I could activate the SCRAM...');
        } else if (mission == 'boron') {
            showMessage(code + ': Just if I had some neutron absorber...');
        } else {
            showMessage(code + ': I can\'t help you Gordon, Talk with Carles, he is the webmaster.');
        }

    } else if (code == 'Rafa') {

        if (mission == 'turbine') {
            showMessage(code + ': I almost have SCALE new version in parallel.');
        } else if (mission == 'cask') {
            showMessage(code + ': Come back later. I have so many things to do.');
        } else if (mission == 'calibrate') {
            showMessage(code + ': You need to read 5842 papers if you want to get your PhD.');
        } else if (mission == 'loading') {
            showMessage(code + ': What would I do without Gumer?');
        } else if (mission == 'criticality') {
            showMessage(code + ': My car broke down... what a pitty.');
        } else if (mission == 'boron') {
            showMessage(code + ': I have so many paper work to do.');
        } else {
            showMessage(code + ': Impossible is nothing.');
        }

    } else if (code == 'Sergio') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, definitely this is not the way to the control room. You cannot access the containmet area now.');
        } else {
            object = 'ppes';
            if (hasObject(object)) {
                showMessage(code + ': You wear proper PPEs, you know what you\'re doing, you can go ahead.');
            } else {
                showMessage(code + ': You can only access the containment if you wear the appropriate personal protective equipment or PPEs. It\'s for your own safety Gordon.');
            }
        }

    } else if (code == 'Your BOSS') {

        if (mission == 'prelude') {

            setCookie('mission', 'turbine');
            interactPerson(code);

        } else if (mission == 'turbine') {
            
            if (isObjectUsed('fuse') && isObjectUsed('switch')) {
                setCookie('mission', 'cask');
                interactPerson(code);
            } else if (isObjectUsed('fuse')) {
                showMessage(code + ': Gordon, you still need to turn the power on, go to the substation now.');
            } else {
                showMessage(code + ': Gordon you are late for work again. We have a problem with turbine power, go help the guys to fix the turbine.');
            }
        
        } else if (mission == 'cask') {
            
            if (isObjectUsed('key')) {
                setCookie('mission', 'calibrate');
                interactPerson(code);
            } else {
                showMessage(code + ': Antonio cannot find the key to start the crawler. Look all over the plant untill you find it.');
            }
        
        } else if (mission == 'calibrate') {
            
            if (isObjectUsed('thermocouple') && isObjectUsed('lubricant')) {
                setCookie('mission', 'loading');
                interactPerson(code);
            } else if (isObjectUsed('thermocouple')) {
                showMessage(code + ': Gordon, you still need to turn the inlet water valve on, it is somewhere near the turbine hall.');
            } else {
                showMessage(code + ': Now, we have a problem with the inlet water temperature sensor, go to the inlet channel to measure the water temperature manually. What? You don\'t have a thermocouple? Do I look like the equipment guy, find one!');
            }
        
        } else if (mission == 'loading') {
            
            if (isObjectUsed('assembly')) {
                setCookie('mission', 'criticality');
                interactPerson(code);
            } else {
                showMessage(code + ': We are almost done with the reloading process. Go help the guys with the loading of last fuel assembly. Put on the PPEs you have next to the stairs.');
            }

        } else if (mission == 'criticality') {

            if (isObjectUsed('scram')) {
                setCookie('mission', 'boron');
                interactPerson(code);
            } else {
                showMessage(code + ': Gordon, the core is reaching criticality, go to the console and activate the SCRAM now!');
            }

        } else if (mission == 'boron') {

            if (isObjectUsed('boron')) {
                setCookie('mission', 'computer');
                interactPerson(code);
            } else {
                object = 'card';
                if (hasObject(object)) {
                    showMessage(code + ': With that ' + object + ' you can access the chemical lab, there you\'ll find Eli.');
                } else {
                    showMessage(code + ': It seams that the boron level is too low. Take this ' + object + ', it is a high security card, only for BOSSES.');
                    pickObject(object);
                }
            }

        } else {
            
            showMessage(code + ': Good Gordon, you are the most talented worker I have. Now go to your computer and write a report over today\'s work. Fun, right?');
        
        }

    } else if (code == 'Workers') {

        if (mission == 'prelude') {
            showMessage(code + ': Gordon, what are you doing here? Go to the control room inmediately.');
        } else if (mission == 'turbine') {
            object = 'fuse';
            if (isObjectUsed(object)) {

                if (isObjectUsed('switch')) {
                    showMessage(code + ': Greate Gordon, the turbine is working again.');
                } else {
                    showMessage(code + ': Greate Gordon, now go to the electrical substation to switch it on.');
                }

            } else {
                showMessage(code + ': Gordon, we got a turbine trip, a fuse is blown.');
            }
        } else {
            showMessage(code + ': Greate Gordon, the turbine is working again.');
        }

    } else if (code == 'casks') {

        showMessage('Nuclear spent fuel is stored in these casks, these are designed to stand high velocity impacts or long periods of time at high temperatures to protect the people and the environment.');

    } else if (code == 'console') {

        showMessage('Nuclear operators go thorugh an exhaustive training to be able to operate the reactor and the turbine safely. One of the most important feature is the SCRAM, it inserts all control rods at once, these absorb neutrons, thus, the reaction chain is stop. Boric acid is also a neutron absorber.');

    } else if (code == 'core') {

        showMessage('The reactor core contains lot of fuel assemblies, the water is heated when fissions are produced in the uranium pellets contained in the fuel rods. Water protects people from radiation.');

    } else if (code == 'towers') {

        showMessage('Cooling towers cooldown the water that goes through the core. These have the shape of a hyperboloid and they only produce clean steam, you can see it as a big cloud generator.');

    } else if (code == 'turbine') {

        showMessage('The turbine generates the electricity. Fissions in uranium pellets release energy to heat the water, thus, steam is produced and makes possible the turbine to spin. The main difference with a conventional plant is the way the heat is generated (uranium fissions or burning fossil fuels).');

    } else if (code == 'valve') {

        showMessage('Nuclear power plants are considered one of the most secure industries. They have redundant equipment, that is, they have the same component twice or thrice just in case one has a malfunction. Equipment need mantainance, for example, apply lubricant if a valve is stucked.');

    } else {
        alert('Error 050. Person code ' + code + ' not recognized.');
    }

}
