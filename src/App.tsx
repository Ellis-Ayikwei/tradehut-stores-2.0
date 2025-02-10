import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './router/routes';
import store from './store';

function App(children: any) {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <CurrencyProvider>
                    <RouterProvider router={router} />
                </CurrencyProvider>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
