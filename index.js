class CatFactory {

  cats = [];

  async getCats() {
    const response = await fetch('./db/cats.json');
    return await response.json();
  }

  async getInfoByKey(type, key) {
    return await this.getCats()
      .then(cats => (cats.find(cat => type.toLowerCase() === cat.name.toLowerCase()) || {})[key]);
  }
 
  async create(type) {
   const avatar = await this.getInfoByKey(type, 'avatar');
   const age = await this.getInfoByKey(type, 'age');
   const description = await this.getInfoByKey(type, 'description');

    switch (type) {
      case 'Murzik':
        return new Cat(type, age, avatar, description);

      case 'Aizek':
        return new Cat(type, age, avatar, description);

      case 'Sam':
        return new Cat(type, age, avatar, description);

      case 'Steven':
        return new Cat(type, age, avatar, description);
   
      default:
        return new Cat(
          type,
          1,
          './images/intern.jpg',
          'I am new cat here. I am gonna pass interview in Catmazon on position intern full stack developer!'
        );
    }
  }
}

class Cat {
  constructor(name, age, avatar, description) {
    this.name = name;
    this.age = age;
    this.avatar = avatar;
    this.description = description;
  }
  
  render(info) {
    const catInfo = {
      name: document.querySelector('.cat__data-name'),
      age: document.querySelector('.cat__data-age'),
      avatar: document.querySelector('.cat__avatar img'),
      description: document.querySelector('.cat__description')
    };

    for (const key in catInfo) {
      if (key === 'avatar') {
        catInfo[key].setAttribute('src', info.avatar);
      } else {
        catInfo[key].innerText = `${info[key]}`;
      }
    }
  }
}

document.querySelector('.cat__create')
  .addEventListener('click', async event => {

    event.preventDefault();

    const catInput = document.querySelector('.cat__input');

    const catInputValue = catInput.value;

    const catFactory = new CatFactory();

    if (!catInputValue) {
      catInput.style.border = '3px solid red';
      return;
    }

    document.querySelector('.cat__portfolio').style.display = 'flex';

    const cat = await catFactory.create(catInputValue);

    cat && cat.render(cat);
  })

  document.querySelector('.cat__input').addEventListener('input', (event) => {
    if (event.target.value) {
      event.target.style.border = 'none';
    }
  })