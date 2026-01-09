import React, { useState } from 'react';

export default function ReactSyntaxRules() {
  const [openSection, setOpenSection] = useState(null);

  const rules = [
    {
      category: "JSX - Основы",
      icon: "📝",
      rules: [
        {
          title: "JSX - это не HTML",
          simple: "JSX выглядит как HTML, но это JavaScript с синтаксическим сахаром. Под капотом он превращается в вызовы функций React.createElement().",
          why: "Позволяет писать структуру UI прямо в JavaScript коде, что удобнее чем создавать элементы через функции.",
          correct: `const element = <h1>Hello, world!</h1>;
// Превращается в:
// React.createElement('h1', null, 'Hello, world!')`,
          wrong: `// Это HTML, не JSX - не сработает в React
<h1>Hello</h1>
<p>World</p>`,
          tip: "JSX должен быть обёрнут в одну корневую ноду или Fragment"
        },
        {
          title: "Один корневой элемент",
          simple: "Компонент может вернуть только ОДИН элемент. Если нужно несколько - оберни их в <div> или <Fragment> (пустые скобки <>).",
          why: "JavaScript функция может вернуть только одно значение. React.createElement() создаёт один элемент, поэтому нужен единый корень.",
          correct: `// Правильно - один корневой элемент
return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);

// Или используй Fragment
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
);`,
          wrong: `// Неправильно - два корневых элемента
return (
  <h1>Title</h1>
  <p>Text</p>
);`,
          tip: "Fragment (<></>) не создаёт лишний DOM элемент"
        },
        {
          title: "className вместо class",
          simple: "В JSX используй className вместо class для CSS классов. Это потому что 'class' - зарезервированное слово в JavaScript.",
          why: "class в JavaScript используется для создания классов (class MyClass {}), поэтому в JSX используется className.",
          correct: `<div className="container">
  <button className="btn btn-primary">Click</button>
</div>`,
          wrong: `// Не работает - class это зарезервированное слово JS
<div class="container">
  <button class="btn">Click</button>
</div>`,
          tip: "Также используй htmlFor вместо for в labels"
        },
        {
          title: "Закрывай все теги",
          simple: "В JSX КАЖДЫЙ тег должен быть закрыт. Даже те, что в HTML могут быть самозакрывающимися (img, input, br). Используй /> для самозакрывающихся тегов.",
          why: "JSX строже чем HTML. Это XML-подобный синтаксис, где все теги должны быть явно закрыты.",
          correct: `<img src="photo.jpg" alt="Photo" />
<input type="text" />
<br />
<Component />`,
          wrong: `// Неправильно - незакрытые теги
<img src="photo.jpg">
<input type="text">
<br>`,
          tip: "Самозакрывающиеся теги заканчиваются на />"
        }
      ]
    },
    {
      category: "Вставка JavaScript в JSX",
      icon: "🔧",
      rules: [
        {
          title: "Фигурные скобки {} для JavaScript",
          simple: "Чтобы вставить JavaScript выражение в JSX, оберни его в фигурные скобки {}. Внутри скобок может быть любой валидный JavaScript код.",
          why: "React должен понимать где заканчивается разметка и начинается код. Скобки - это сигнал 'тут JavaScript'.",
          correct: `const name = 'John';
const age = 25;

return (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Age: {age + 5}</p>
    <p>{age > 18 ? 'Adult' : 'Child'}</p>
    <p>{user.name.toUpperCase()}</p>
  </div>
);`,
          wrong: `// Неправильно - без скобок это строка
<h1>Hello, name!</h1>
<p>Age: age + 5</p>`,
          tip: "Внутри {} можно использовать переменные, выражения, функции"
        },
        {
          title: "В {} только выражения, не инструкции",
          simple: "Внутри {} можно писать только выражения (то, что возвращает значение), но НЕ инструкции (if, for, while). Используй тернарный оператор или &&.",
          why: "JSX ожидает значение для вставки в разметку. if/for - это инструкции, они не возвращают значения.",
          correct: `// Тернарный оператор
{isLoggedIn ? <Dashboard /> : <Login />}

// Логическое И
{isLoggedIn && <Dashboard />}

// Немедленно вызываемая функция (IIFE)
{(() => {
  if (score > 90) return 'A';
  if (score > 80) return 'B';
  return 'C';
})()}`,
          wrong: `// Неправильно - if это инструкция
{if (isLoggedIn) {
  <Dashboard />
}}

// Неправильно - for это инструкция
{for (let i = 0; i < 5; i++) {
  <div>{i}</div>
}}`,
          tip: "Для списков используй .map(), для условий - тернарный оператор"
        },
        {
          title: "Атрибуты в camelCase",
          simple: "HTML атрибуты в JSX пишутся в camelCase: onClick вместо onclick, onChange вместо onchange. Это стандарт JavaScript для свойств объектов.",
          why: "JSX превращается в JavaScript объекты, где ключи традиционно пишутся в camelCase.",
          correct: `<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<div onMouseEnter={handleHover} />
<img src={url} alt={text} />
<label htmlFor="name">Name</label>`,
          wrong: `// Неправильно - неверный регистр
<button onclick={handleClick}>Click</button>
<input onchange={handleChange} />
<label for="name">Name</label>`,
          tip: "Исключения: data-* и aria-* атрибуты остаются в kebab-case"
        },
        {
          title: "style принимает объект",
          simple: "Атрибут style в JSX принимает JavaScript объект, а не строку. Свойства CSS пишутся в camelCase, значения - в кавычках или числами.",
          why: "React работает с JavaScript объектами для стилей, что позволяет динамически изменять их и обеспечивает типобезопасность.",
          correct: `<div style={{
  color: 'red',
  backgroundColor: 'blue',  // background-color
  fontSize: '16px',          // font-size
  marginTop: 20              // автоматически px
}}>
  Styled text
</div>

const styles = { color: 'red' };
<div style={styles}>Text</div>`,
          wrong: `// Неправильно - строка вместо объекта
<div style="color: red; background-color: blue;">
  Text
</div>

// Неправильно - kebab-case
<div style={{ 'background-color': 'blue' }}>`,
          tip: "Двойные скобки: внешние для JS, внутренние для объекта"
        }
      ]
    },
    {
      category: "Компоненты",
      icon: "🧩",
      rules: [
        {
          title: "Компоненты с большой буквы",
          simple: "Имена компонентов ВСЕГДА начинаются с большой буквы. Это обязательное правило! React использует регистр чтобы различать HTML теги (<div>) и компоненты (<MyComponent>).",
          why: "React смотрит на первую букву: маленькая = HTML тег, большая = React компонент. Это техническое требование.",
          correct: `function Button() { return <button>Click</button>; }
function UserProfile() { return <div>User</div>; }

// Использование
<Button />
<UserProfile />`,
          wrong: `// Неправильно - с маленькой буквы
function button() { return <button>Click</button>; }
<button />  // React думает это HTML тег`,
          tip: "Даже если компонент из одного слова - с большой буквы!"
        },
        {
          title: "Компонент должен что-то возвращать",
          simple: "Каждый компонент ОБЯЗАН возвращать JSX, null, или другой валидный React элемент. Без return компонент не работает.",
          why: "React вызывает компонент как функцию и ожидает получить разметку для отрисовки.",
          correct: `// Явный return
function Component() {
  return <div>Content</div>;
}

// Неявный return со стрелочной функцией
const Component = () => <div>Content</div>;

// Или с круглыми скобками
const Component = () => (
  <div>
    <h1>Title</h1>
  </div>
);

// Можно вернуть null
function Component() {
  if (!show) return null;
  return <div>Content</div>;
}`,
          wrong: `// Неправильно - нет return
function Component() {
  <div>Content</div>
}

// Неправильно - return undefined
function Component() {
  return;
}`,
          tip: "Если компонент на несколько строк - оберни JSX в круглые скобки ()"
        },
        {
          title: "Props - это объект",
          simple: "Все атрибуты, переданные компоненту, приходят в него как ОДИН объект 'props'. Можешь деструктурировать его сразу в параметрах функции.",
          why: "React собирает все атрибуты в единый объект для удобной передачи данных.",
          correct: `// С props объектом
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// С деструктуризацией (предпочтительно)
function Greeting({ name, age }) {
  return <h1>Hello, {name}, age {age}!</h1>;
}

// Использование
<Greeting name="John" age={25} />`,
          wrong: `// Неправильно - props не деструктурированы
function Greeting(name, age) {
  return <h1>Hello, {name}!</h1>;
}`,
          tip: "Используй деструктуризацию - это чище и понятнее"
        },
        {
          title: "Props только для чтения",
          simple: "НИКОГДА не изменяй props напрямую! Props - это неизменяемые (immutable) данные, которые компонент получает от родителя. Если нужно изменить - используй state.",
          why: "React основан на однонаправленном потоке данных. Изменение props нарушит этот принцип и приведёт к багам.",
          correct: `function Counter({ initialCount }) {
  // Копируем в state если нужно изменять
  const [count, setCount] = useState(initialCount);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
          wrong: `function Counter({ count }) {
  // НЕПРАВИЛЬНО! Нельзя менять props
  count = count + 1;
  
  return <button>{count}</button>;
}`,
          tip: "Props сверху вниз, события снизу вверх"
        }
      ]
    },
    {
      category: "Списки и ключи",
      icon: "📋",
      rules: [
        {
          title: "Используй .map() для списков",
          simple: "Чтобы отрисовать массив элементов, используй .map(). Он проходит по массиву и возвращает JSX для каждого элемента.",
          why: ".map() возвращает новый массив элементов, что идеально подходит для JSX.",
          correct: `const items = ['Apple', 'Banana', 'Orange'];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Или с объектами
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

return (
  <div>
    {users.map(user => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);`,
          wrong: `// Неправильно - for loop не работает в JSX
{for (let item of items) {
  <li>{item}</li>
}}`,
          tip: "Вынеси .map() в отдельную переменную если логика сложная"
        },
        {
          title: "key обязателен для списков",
          simple: "Каждый элемент в списке ДОЛЖЕН иметь уникальный prop 'key'. Это помогает React понять какие элементы изменились, добавились или удалились.",
          why: "React использует key для оптимизации: без него он не знает какие элементы обновлять и перерисует всё.",
          correct: `// Лучше всего - уникальный ID из данных
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// Если нет ID - используй index (но не идеально)
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}`,
          wrong: `// Неправильно - нет key
{users.map(user => (
  <UserCard user={user} />
))}

// Плохо - не уникальный key
{users.map(user => (
  <UserCard key="user" user={user} />
))}`,
          tip: "Не используй index как key если список может меняться"
        },
        {
          title: "key должен быть стабильным и уникальным",
          simple: "key должен быть уникальным среди соседних элементов и не меняться между рендерами. Лучше всего использовать ID из базы данных.",
          why: "Нестабильный key заставит React удалять и пересоздавать компоненты, теряя состояние.",
          correct: `// Отлично - стабильный ID из данных
{posts.map(post => (
  <Post key={post.id} post={post} />
))}

// Хорошо - комбинация полей если нет ID
{items.map(item => (
  <Item key={\`\${item.category}-\${item.name}\`} item={item} />
))}`,
          wrong: `// ПЛОХО - Math.random() создаёт новый key каждый раз
{items.map(item => (
  <Item key={Math.random()} item={item} />
))}

// ПЛОХО - index когда список сортируется/фильтруется
{filteredItems.map((item, index) => (
  <Item key={index} item={item} />
))}`,
          tip: "Если данные из БД - всегда используй их ID как key"
        }
      ]
    },
    {
      category: "События",
      icon: "⚡",
      rules: [
        {
          title: "Передавай функцию, а не вызов",
          simple: "В обработчики событий передавай ССЫЛКУ на функцию, а не её вызов. Пиши onClick={handleClick}, а НЕ onClick={handleClick()}.",
          why: "Со скобками функция вызовется немедленно при рендере. Без скобок React вызовет её когда произойдёт событие.",
          correct: `function handleClick() {
  console.log('Clicked!');
}

// Правильно - передаём функцию
<button onClick={handleClick}>Click</button>

// Если нужны параметры - оберни в стрелочную функцию
<button onClick={() => handleClick(id)}>Click</button>

// Или используй bind
<button onClick={handleClick.bind(null, id)}>Click</button>`,
          wrong: `// Неправильно - вызов функции при рендере
<button onClick={handleClick()}>Click</button>

// Функция выполнится сразу, а не при клике!`,
          tip: "Если нужны параметры - используй стрелочную функцию обёртку"
        },
        {
          title: "event.preventDefault() для отмены действия",
          simple: "Чтобы отменить стандартное поведение (например, отправку формы), вызови event.preventDefault() в обработчике.",
          why: "В React нельзя вернуть false из обработчика, нужно явно вызывать preventDefault().",
          correct: `function handleSubmit(event) {
  event.preventDefault(); // Отменяем перезагрузку страницы
  console.log('Form submitted');
}

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>`,
          wrong: `// Неправильно - return false не работает в React
function handleSubmit(event) {
  console.log('Form submitted');
  return false;
}`,
          tip: "event в React - это SyntheticEvent, обёртка над нативным событием"
        },
        {
          title: "this в обработчиках классовых компонентов",
          simple: "В классовых компонентах нужно привязывать this в обработчиках, иначе this будет undefined. Используй bind в конструкторе или стрелочные функции.",
          why: "JavaScript не привязывает this автоматически в обычных методах класса.",
          correct: `class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // Вариант 1: bind в конструкторе
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log(this.state);
  }
  
  // Вариант 2: стрелочная функция (лучше)
  handleClick2 = () => {
    console.log(this.state);
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}`,
          wrong: `class MyComponent extends React.Component {
  handleClick() {
    console.log(this.state); // this будет undefined!
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}`,
          tip: "В функциональных компонентах эта проблема отсутствует"
        }
      ]
    },
    {
      category: "Условный рендеринг",
      icon: "🔀",
      rules: [
        {
          title: "Используй && для условного рендеринга",
          simple: "Логическое И (&&) - самый простой способ показать элемент только если условие true. Если условие false, ничего не отрисуется.",
          why: "JavaScript вычисляет && слева направо и возвращает первое falsy значение или последнее значение.",
          correct: `{isLoggedIn && <Dashboard />}

{count > 0 && <p>Items: {count}</p>}

{user && <UserProfile user={user} />}

{items.length > 0 && (
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)}`,
          wrong: `// Осторожно! 0 и '' отрисуются как текст
{count && <p>Items: {count}</p>}
// Если count = 0, на экране будет "0"

// Правильно:
{count > 0 && <p>Items: {count}</p>}`,
          tip: "Проверяй не falsy значения, а конкретные условия (> 0, !== null)"
        },
        {
          title: "Тернарный оператор для выбора из двух",
          simple: "Тернарный оператор (? :) используй когда нужно показать одно ИЛИ другое. Это как короткий if-else прямо в JSX.",
          why: "Тернарник возвращает значение, поэтому работает в JSX. Обычный if не возвращает значение.",
          correct: `{isLoggedIn ? <Dashboard /> : <Login />}

{status === 'loading' ? (
  <Spinner />
) : (
  <Content />
)}

<div className={isActive ? 'active' : 'inactive'}>
  {isActive ? 'On' : 'Off'}
</div>`,
          wrong: `// Неправильно - if не работает в JSX
{if (isLoggedIn) {
  <Dashboard />
} else {
  <Login />
}}`,
          tip: "Для сложных условий вынеси логику в переменную или функцию"
        },
        {
          title: "null для скрытия элемента",
          simple: "Если компонент должен ничего не отрисовывать - верни null. Это валидное значение для React.",
          why: "null говорит React 'не рисуй ничего'. Это лучше чем пустая строка или undefined.",
          correct: `function Warning({ show, message }) {
  if (!show) return null;
  
  return (
    <div className="warning">
      {message}
    </div>
  );
}

// Или с тернарником
{show ? <Warning /> : null}`,
          wrong: `// Плохо - возвращает undefined
function Component({ show }) {
  if (!show) return;
  return <div>Content</div>;
}`,
          tip: "Ранний return null - хорошая практика для упрощения кода"
        }
      ]
    },
    {
      category: "Хуки - основные правила",
      icon: "🎣",
      rules: [
        {
          title: "Вызывай хуки только на верхнем уровне",
          simple: "Хуки можно вызывать ТОЛЬКО на верхнем уровне компонента, НЕ внутри циклов, условий или вложенных функций. Всегда в одном и том же порядке.",
          why: "React использует порядок вызова хуков чтобы связать состояние с компонентом. Изменение порядка сломает эту связь.",
          correct: `function Component() {
  // Правильно - на верхнем уровне
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  useEffect(() => {
    document.title = count;
  }, [count]);
  
  return <div>{count}</div>;
}`,
          wrong: `function Component() {
  // НЕПРАВИЛЬНО - внутри условия
  if (something) {
    const [count, setCount] = useState(0);
  }
  
  // НЕПРАВИЛЬНО - внутри цикла
  for (let i = 0; i < 5; i++) {
    useEffect(() => {});
  }
  
  // НЕПРАВИЛЬНО - внутри функции
  function handleClick() {
    const [value, setValue] = useState(0);
  }
}`,
          tip: "ESLint плагин eslint-plugin-react-hooks проверит это автоматически"
        },
        {
          title: "Вызывай хуки только из React функций",
          simple: "Хуки можно вызывать ТОЛЬКО из функциональных компонентов React или из своих кастомных хуков. Нельзя вызывать в обычных JavaScript функциях.",
          why: "Хуки привязаны к жизненному циклу React компонентов и не работают вне этого контекста.",
          correct: `// Правильно - в компоненте
function MyComponent() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}

// Правильно - в кастомном хуке
function useCustomHook() {
  const [state, setState] = useState(0);
  return [state, setState];
}`,
          wrong: `// НЕПРАВИЛЬНО - в обычной функции
function regularFunction() {
  const [state, setState] = useState(0);
  return state;
}

// НЕПРАВИЛЬНО - в классовом компоненте
class MyComponent extends React.Component {
  render() {
    const [state, setState] = useState(0);
    return <div>{state}</div>;
  }
}`,
          tip: "Кастомные хуки должны начинаться с 'use'"
        },
        {
          title: "Массив зависимостей обязателен",
          simple: "В useEffect, useMemo, useCallback всегда указывай массив зависимостей (второй параметр). Это контролирует когда эффект перезапускается.",
          why: "Без массива эффект запускается при каждом рендере. Пустой массив [] = только при монтировании.",
          correct: `// Запуск при изменении count
useEffect(() => {
  console.log(count);
}, [count]);

// Запуск один раз при монтировании
useEffect(() => {
  fetchData();
}, []);

// Запуск при каждом рендере (редко нужно)
useEffect(() => {
  console.log('Every render');
});`,
          wrong: `// Забыли зависимости - может быть баг
useEffect(() => {
  console.log(count); // count может быть устаревшим
});

// Указали неполные зависимости
useEffect(() => {
  console.log(count, name);
}, [count]); // забыли name`,
          tip: "ESLint плагин предупредит о недостающих зависимостях"
        }
      ]
    },
    {
      category: "Производительность",
      icon: "⚡",
      rules: [
        {
          title: "Не создавай объекты/массивы в JSX",
          simple: "Не создавай новые объекты, массивы или функции прямо в JSX при каждом рендере. Это заставит дочерние компоненты перерисовываться без причины.",
          why: "Каждый раз создаётся новый объект с новой ссылкой в памяти, даже если данные те же. React думает что props изменились.",
          correct: `// Вынеси объект наружу если он статичный
const style = { color: 'red', fontSize: '16px' };

function Component() {
  return <div style={style}>Text</div>;
}

// Или используй useMemo для динамических данных
const style = useMemo(() => ({
  color: isActive ? 'red' : 'blue',
  fontSize: '16px'
}), [isActive]);`,
          wrong: `// Плохо - новый объект при каждом рендере
function Component() {
  return (
    <div style={{ color: 'red', fontSize: '16px' }}>
      Text
    </div>
  );
}

// Плохо - новая функция каждый раз
<ChildComponent onClick={() => handleClick(id)} />`,
          tip: "Для функций используй useCallback, для значений - useMemo"
        },
        {
          title: "React.memo для оптимизации компонентов",
          simple: "Оберни компонент в React.memo() чтобы он не перерисовывался если props не изменились. Это как 'запомнить' результат рендера.",
          why: "По умолчанию React перерисовывает компонент если его родитель перерисовался, даже если props те же.",
          correct: `// Без оптимизации
function ExpensiveComponent({ data }) {
  return <div>{/* сложная разметка */}</div>;
}

// С мемоизацией
const ExpensiveComponent = React.memo(function({ data }) {
  return <div>{/* сложная разметка */}</div>;
});

// Теперь перерисуется только если data изменится`,
          wrong: `// Не оборачивай каждый компонент в memo
// Используй только для тяжёлых компонентов
const TinyComponent = React.memo(({ text }) => <span>{text}</span>);
// Оверхед memo может быть больше чем польза`,
          tip: "Используй memo только если видишь проблемы с производительностью"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Правила синтаксиса React
          </h1>
          <p className="text-xl text-gray-600">
            Все основные правила простым языком с примерами
          </p>
        </div>

        <div className="space-y-6">
          {rules.map((category, catIdx) => (
            <div key={catIdx} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-4xl">{category.icon}</span>
                  {category.category}
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {category.rules.map((rule, ruleIdx) => {
                  const sectionId = `${catIdx}-${ruleIdx}`;
                  const isOpen = openSection === sectionId;

                  return (
                    <div key={ruleIdx} className="p-6 hover:bg-gray-50 transition-colors">
                      <button
                        onClick={() => setOpenSection(isOpen ? null : sectionId)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-purple-600 mb-3">
                              {rule.title}
                            </h3>
                            
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-3">
                              <p className="text-blue-900 leading-relaxed">
                                <span className="font-semibold">💡 Простыми словами: </span>
                                {rule.simple}
                              </p>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-3">
                              <p className="text-green-900 leading-relaxed">
                                <span className="font-semibold">🎯 Почему так: </span>
                                {rule.why}
                              </p>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                              <p className="text-yellow-900 text-sm">
                                <span className="font-semibold">💎 Совет: </span>
                                {rule.tip}
                              </p>
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                              {isOpen ? '−' : '+'}
                            </div>
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="mt-6 space-y-4 animate-fadeIn">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">✓</span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-700">
                                Правильно:
                              </h4>
                            </div>
                            <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto">
                              <pre className="text-sm font-mono whitespace-pre-wrap">
                                {rule.correct}
                              </pre>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">✗</span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-700">
                                Неправильно:
                              </h4>
                            </div>
                            <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto">
                              <pre className="text-sm font-mono whitespace-pre-wrap">
                                {rule.wrong}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">🎓 Главные принципы React</h2>
          <div className="space-y-4 text-lg">
            <p className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <span><strong>Декларативность:</strong> Описывай ЧТО должно быть на экране, а не КАК это сделать</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <span><strong>Компонентность:</strong> Разбивай UI на маленькие переиспользуемые части</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <span><strong>Однонаправленный поток данных:</strong> Данные идут сверху вниз через props</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <span><strong>Неизменяемость:</strong> Не меняй данные напрямую, создавай новые копии</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">5️⃣</span>
              <span><strong>Виртуальный DOM:</strong> React сам решает что и когда обновлять эффективно</span>
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📚 Полезные ресурсы для изучения
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-purple-600">▸</span>
              <span>Официальная документация: <code className="bg-gray-100 px-2 py-1 rounded">react.dev</code></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">▸</span>
              <span>ESLint плагин для проверки правил: <code className="bg-gray-100 px-2 py-1 rounded">eslint-plugin-react-hooks</code></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">▸</span>
              <span>React DevTools для отладки в браузере</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}