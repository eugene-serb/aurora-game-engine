'use strict';

import Gameloop from '../src/index.js';

describe('[Class][Gameloop] create instance', () => {
  const params = {
    speedRate: 1000,
  }
  const gameloop = new Gameloop(params);

  test('Object is being created', () => {
    expect(gameloop).not.toBeNull();
  });

  test('Object has params', () => {
    expect(gameloop.params).toBe(params);
  });

  test('Object has interval and this null after init', () => {
    expect(gameloop.interval).toBeNull();
  });

  test('Object has isGameOver and this false after init', () => {
    expect(gameloop.isGameOver).toBe(false);
  });

  test('Object has isPaused and this false after init', () => {
    expect(gameloop.isPaused).toBe(false);
  });

  test('Object has correct speedRate', () => {
    expect(gameloop.SPEED_RATE).toBe(params.speedRate);
  });
});

describe('[Class][Gameloop] call start', () => {
  const params = {
    speedRate: 1000,
  }
  const gameloop = new Gameloop(params);
  gameloop.start();

  test('After call start interval not null', () => {
    expect(gameloop.interval).not.toBeNull();
  });

  test('After call start isPaused is false', () => {
    expect(gameloop.isPaused).toBe(false);
  });

  test('After call start isGameOver is false', () => {
    expect(gameloop.isGameOver).toBe(false);
  });
});

describe('[Class][Gameloop] call stop after call start', () => {
  const params = {
    speedRate: 1000,
  }
  const gameloop = new Gameloop(params);
  gameloop.start();
  gameloop.stop();

  test('After call stop interval not null', () => {
    expect(gameloop.interval).not.toBeNull();
  });

  test('After call stop isPaused is true', () => {
    expect(gameloop.isPaused).toBe(true);
  });

  test('After call stop isGameOver is false', () => {
    expect(gameloop.isGameOver).toBe(false);
  });
});
