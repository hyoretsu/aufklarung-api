import { container } from 'tsyringe';

import IExampleProvider from './models/IExampleProvider';

import ExampleProvider from './implementations/ExampleProvider';

const providers = {
 example: Example,
};

container.registerSingleton<ExampleProvider>('ExampleProvider', providers.example);
