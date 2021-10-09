const createAutoComplete = ({ 
    root, 
    renderOption, 
    onOptionSelect, 
    inputValue,
    fetchData
  }) => {
    root.innerHTML = `
        <label><b> Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    const onInput = async event => {//event listener will expect every change
        const items = await fetchData(event.target.value);
        
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = '';//clears list for every search
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {//closes dropdown and put the movie title
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            
            resultsWrapper.appendChild(option);
        }
    };
    input.addEventListener('input', debounce(onInput, 500));

    document.addEventListener('click', event =>{
        if (!root.contains(event.target)){//if user clicks outside root
            dropdown.classList.remove('is-active');//close dropdown
        }
    });

};