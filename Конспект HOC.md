# Конспект занятия: Компоненты высшего порядка (Higher Order Components, HOC)

---

## План занятия

- Интерфейс оператора такси  
- Чистые функции  
- Функции высшего порядка  
- Компоненты высшего порядка  

---

## Задача

Реализовать интерфейс оператора такси, который получает список заказов из API и отображает их.

---

## Пример базового компонента списка заказов

```tsx
export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`${HOST}/orders`);
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return <OrderListView orders={orders} />;
}

interface OrderListViewProps {
  orders: Order[];
}

export function OrderListView({ orders = [] }: OrderListViewProps) {
  return orders.map(order => <OrderView key={order.id} info={order} />);
}

interface OrderViewProps {
  info: Order;
}

export function OrderView({ info }: OrderViewProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8, borderRadius: 4 }}>
      <h3>Заказ #{info.id}</h3>
      <p><strong>Клиент:</strong> {info.customerName}</p>
      <p><strong>Откуда:</strong> {info.pickupLocation}</p>
      <p><strong>Куда:</strong> {info.dropoffLocation}</p>
      <p><strong>Водитель:</strong> {info.driverName}</p>
      <p><strong>Статус:</strong> {info.status}</p>
      <p><strong>Цена:</strong> {info.price} ₽</p>
    </div>
  );
}
```

---

## Проблема повторения кода

В компонентах `OrderList` и `Order` реализовано схожее поведение загрузки данных из API с помощью `useEffect` и `fetch`. При добавлении новых компонентов с загрузкой данных придется копировать и менять код — нарушение принципа DRY (Don’t Repeat Yourself).

---

## Чистые функции

- Не изменяют внешние данные  
- Не имеют побочных эффектов  
- Все данные передаются через аргументы  
- При одинаковых аргументах возвращают одинаковый результат  

Пример чистой функции:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Пример не чистой функции:

```ts
let a = 1;
function badAdd(b: number): number {
  return a + b;
}
```

---

## Функции высшего порядка (Higher Order Functions)

Функция, которая принимает другую функцию в аргументы или возвращает функцию.

Пример:

```ts
function withLogger(tag: string, operation: (a: number, b: number) => number) {
  return function (...args: [number, number]) {
    console.log(tag, ...args);
    return operation(...args);
  };
}

const loggedAdd = withLogger('Сумма', add);
loggedAdd(10, 2); // Выведет: Сумма 10 2
```

---

## Компоненты высшего порядка (Higher Order Components, HOC)

Функция, принимающая компонент и возвращающая новый компонент с дополнительной функциональностью.

Пример компонента счетчика:

```tsx
export function Counter({ value, decOne, addOne }) {
  return (
    <div>
      <button onClick={decOne}>-</button>
      <span>{value}</span>
      <button onClick={addOne}>+</button>
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);

  return (
    <Counter
      value={value}
      addOne={() => setValue(v => v + 1)}
      decOne={() => setValue(v => v - 1)}
    />
  );
}
```

Добавим логирование пропсов с помощью HOC:

```tsx
export function withLogger<P>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function Logger(props: P) {
    console.log(props);
    return <Component {...props} />;
  };
}

const LoggedCounter = withLogger(Counter);

function App() {
  const [value, setValue] = useState(0);

  return (
    <LoggedCounter
      value={value}
      addOne={() => setValue(v => v + 1)}
      decOne={() => setValue(v => v - 1)}
    />
  );
}
```

---

## Универсальный HOC для загрузки данных из API

```tsx
export function withData<P>(
  Component: React.ComponentType<P>,
  endpoint: string | ((id: number) => string),
  propName: string,
): React.FC<P & { id?: number }> {
  return function WithData(props: P & { id?: number }) {
    const [data, setData] = useState<any>();

    useEffect(() => {
      async function fetchData() {
        let url = endpoint;
        if (typeof endpoint === 'function' && props.id !== undefined) {
          url = endpoint(props.id);
        }
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      }
      fetchData();
    }, [endpoint, props.id]);

    return <Component {...props} {...{ [propName]: data }} />;
  };
}
```

Использование:

```tsx
export const OrderList = withData(
  OrderListView,
  `${HOST}/orders`,
  'orders'
);

export const Order = withData(
  OrderView,
  (id) => `${HOST}/orders/${id}`,
  'info'
);
```

---

## Альтернатива — кастомный хук `useData`

```tsx
export function useData<T, U>(
  endpoint: string,
  dataToState: (data: T) => U
): U | undefined {
  const [state, setState] = useState<U>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(endpoint);
      const data: T = await response.json();
      setState(dataToState(data));
    }
    fetchData();
  }, [endpoint, dataToState]);

  return state;
}
```

---

## Итоги

- Чистые функции помогают писать предсказуемый и тестируемый код  
- Функции высшего порядка позволяют оборачивать функциональность и переиспользовать логику  
- Компоненты высшего порядка (HOC) — мощный паттерн расширения функционала React-компонентов без наследования  
- Использование HOC и кастомных хуков помогает избежать дублирования кода при работе с загрузкой данных и другими общими задачами  
- Следуйте принципу DRY — не повторяйте код, используйте универсальные абстракции  

---

**Применение функционального программирования и HOC в React облегчает поддержку и развитие приложения, позволяя создавать переиспользуемые и расширяемые компоненты.**