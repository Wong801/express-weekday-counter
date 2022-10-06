import 'regenerator-runtime/runtime';
import express from 'express';
import App from './app';
import loaders from './loaders';

const app = new App({
  express,
  loaders,
  port: process.env.PORT,
});

app.start();
