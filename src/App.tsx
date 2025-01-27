import { RouterProvider } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './router/routes';

function App(children: any) {
    return (
        <ThemeProvider>
            <CurrencyProvider>
                <RouterProvider router={router} />
            </CurrencyProvider>
        </ThemeProvider>
    );
}

export default App;
