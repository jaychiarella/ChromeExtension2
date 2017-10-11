// For todays date ... stolen from https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now ... stolen from https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?" 0":" ") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}

const model = {
    init: function(){
        localStorage.app = JSON.stringify([]);
    },
    add: function(id,time){
        const data = JSON.parse(localStorage.app);
        const tab = {idtime:id + time};
        data.push(tab);
        localStorage.app = JSON.stringify(data);
    }
};

const controller = {
    init: function(){
        view.init();
        model.init();
    },
    queryTabs: function(){
        const queryInfo = {} // select all tabs
        chrome.tabs.query(queryInfo,(tabs) => {
            const currentTime = new Date().timeNow();
            tabs.forEach((tab) => {
                model.add(tab.id, currentTime);
            })
        });
    }
};

const view = {
    init: function(){
        const findButton = document.getElementById('only-button');
        findButton.addEventListener('click', controller.queryTabs);
    }
}

function displayTime(){
    const findDestination = document.getElementById('old-tabs');
    findDestination.textContent = new Date().today() + new Date().timeNow();
}

document.addEventListener('DOMContentLoaded', () => {
    controller.init();
});