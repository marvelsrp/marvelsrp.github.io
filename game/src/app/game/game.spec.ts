import {
  beforeEachProviders,
  describe,
  inject,
  it
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Game } from './game.component';
import { Title } from './title';

describe('Game', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    AppState,
    Title,
    game
  ]);

  it('should have default data', inject([ game ], (game) => {
    expect(game.localState).toEqual({ nickname: '' });
  }));

  it('should have a title', inject([ game ], (game) => {
    expect(!!game.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ game ], (game) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    game.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
