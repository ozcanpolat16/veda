class MessageController {
    constructor() {
        this.container = document.getElementById('mainContainer');
        this.waitingMessage = document.getElementById('waitingMessage');
        this.farewellLetter = document.getElementById('farewellLetter');
        this.lastCheck = 0;
        this.checkInterval = 1000;
        this.messageShown = false;
        this.init();
    }

    async init() {
        this.container.classList.add('visible');
        await this.checkTime();
        this.startPeriodicCheck();
    }

    startPeriodicCheck() {
        setInterval(() => this.checkTime(), this.checkInterval);
    }

    // ... diğer kodlar ...

async checkTime() {
    try {
        const targetDate = new Date('2025-01-18T08:00:00+03:00'); // Saat 08:00 olarak güncellendi
        const currentDate = new Date();
        const remainingTime = targetDate - currentDate;

        if (remainingTime <= 0 && !this.messageShown) {
            this.showFarewellMessage();
            this.messageShown = true;
        } else if (remainingTime > 0) {
            this.updateRemainingTime(remainingTime);
        }
    } catch (error) {
        console.error('Zaman kontrolünde hata:', error);
    }
}

// ... diğer kodlar ...

    showFarewellMessage() {
        this.waitingMessage.style.opacity = '0';
        setTimeout(() => {
            this.waitingMessage.style.display = 'none';
            this.farewellLetter.style.display = 'block';
            setTimeout(() => {
                this.farewellLetter.style.opacity = '1';
                this.animateParagraphs();
            }, 100);
        }, 1000);
    }

    animateParagraphs() {
        const paragraphs = letterContent.split('\n\n');
        this.farewellLetter.innerHTML = `
            <div class="letter-content">
                ${paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>`;

        const allParagraphs = this.farewellLetter.querySelectorAll('p');
        allParagraphs.forEach((p, index) => {
            setTimeout(() => p.classList.add('visible'), index * 1000);
        });
    }

    updateRemainingTime(remainingTime) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        const remainingTextElement = this.waitingMessage.querySelector('.remaining-text');
        
        if (remainingTextElement) {
            let message = 'Son mektubumu okumanıza...';
            if (days > 0) message += `\n${days} gün`;
            if (hours > 0) message += ` ${hours} saat`;
            if (minutes > 0) message += ` ${minutes} dakika`;
            message += ` ${seconds} saniye kaldı`;

            remainingTextElement.innerHTML = message.split('\n').join('<br>');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MessageController();
});