document.addEventListener('DOMContentLoaded', () => {
    const alfabetoa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const kripto = "BAR BS GUR SRNGHERF BS GUR PNRFNE PVCURE BE INEVNGVBAF BS VG GUNG ZNXRF VG RNFVYL PBZCEBZVFRQ VF GUNG RNPU PUNENPGRE AB ZNGGRE UBJ ZNAL CBFVGVBAF VG VF FUVSGRQ VF PBAFVFGRAGYL ERCERFRAGRQ OL GUR FNZR PBEERFCBAQVAT PUNENPGRE VS GUR PVCUREGRKG PUNENPGRE SBE N VF A GURA VG VF NYJNLF A GUEBHTUBHG GUR RAPELCGRQ ZRFFNTR GUVF ZRNAF GUNG PELCGNANYLFVF PNA HFR PUNENPGRE SERDHRAPL NANYLFVF GB ZNXR THRFFRF NG JUVPU PVCUREGRKG PUNENPGREF PBEERFCBAQ GB JUVPU CYNVAGRKG PUNENPGREF";
    const kriptograma = document.getElementById('kriptograma');
    const mezuArgia = document.getElementById('mezuArgia');
    const etaoin = document.getElementById('etaoin');
    const alphabetDiv = document.querySelector('.alphabet');

    // Initialize 'Mezu argia' with underscores and spaces corresponding to the 'kripto'
    let mezuArgiaContent = kripto.split('').map(char => (char === ' ' ? ' ' : '_')).join('');

    kriptograma.value = kripto;
    mezuArgia.value = mezuArgiaContent;

    // Object to keep track of current substitutions
    let substitutionMap = {};

    function updateMezuArgia() {
        // Build the decrypted message using the current substitutions
        mezuArgiaContent = kripto.split('').map((char) => {
            if (char === ' ') return ' ';
            return substitutionMap[char] || '_';
        }).join('');
        mezuArgia.value = mezuArgiaContent;
    }

    function calculateFrequency() {
        const frequency = [...kripto.replace(/\s/g, '')].reduce((acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});

        const sortedFrequency = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .map(([char, count]) => `${char}: ${count}`)
            .join(', ');

        return sortedFrequency;
    }

    etaoin.value = `Letras que más se repiten en inglés: ETAOIN SHRDLU\n${calculateFrequency()}`;

    alfabetoa.forEach(char => {
        const charDiv = document.createElement('div');
        const charLabel = document.createElement('span');
        charLabel.textContent = char;

        const charInput = document.createElement('input');
        charInput.type = 'text';
        charInput.maxLength = 1;
        charInput.style.width = '30px';

        // Event listener for input changes
        charInput.addEventListener('input', (e) => {
            const hizki = e.target.value.toUpperCase(); // Ensure uppercase
            if (hizki) {
                substitutionMap[char] = hizki; // Add the substitution
            } else {
                delete substitutionMap[char]; // Remove the substitution if input is empty
            }
            updateMezuArgia();
        });

        charDiv.appendChild(charLabel);
        charDiv.appendChild(charInput);
        alphabetDiv.appendChild(charDiv);
    });

    // Function to synchronize selection between textareas
    function syncSelection(source, target) {
        const start = source.selectionStart;
        const end = source.selectionEnd;
        console.log(start, end);
    
        // Use setTimeout to set the selection range after a short delay
        setTimeout(() => {
            target.focus();
            target.setSelectionRange(start, end);
        }, 100);

    }

    // Add event listeners for selection changes
    kriptograma.addEventListener('select', () => {
        syncSelection(kriptograma, mezuArgia);
    });

    mezuArgia.addEventListener('select', () => {
        syncSelection(mezuArgia, kriptograma);
    });
});
