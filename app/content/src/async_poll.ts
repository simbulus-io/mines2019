interface AsyncPollOptions {
  interval: number;
  timeout: number;
}

async function delay(t: number) {
  return new Promise(yay => setTimeout(yay, t));
}

export async function asyncPoll<T>(
  fn: () => Promise<T>,
  conditionFn: (d: T) => boolean,
  options: AsyncPollOptions
) {
  const { interval, timeout }: AsyncPollOptions = options || {};

  if (typeof interval !== 'number' || interval < 0) {
    throw new TypeError(`Expected 'interval' to be a valid number, but received '${interval}'`);
  }

  if (typeof timeout !== 'number') {
    throw new TypeError(`Expected 'timeout' to be a valid number, but received '${timeout}'`);
  }

  try {
    const itv = +interval;
    const maxItv = +timeout;
    const isForever = timeout < 1;

    let d: T;
    const op = 0;
    const ed = 0;
    let duration = 0;
    let i = 0;
    let shouldContinuePolling = false;

    do {
      d = await fn();
      const diff = Math.ceil(ed - op);
      shouldContinuePolling = isForever ? true : duration < maxItv && !conditionFn(d);
      duration += diff > itv ? diff : itv;
      /** NOTE: Fast return */
      if (!shouldContinuePolling) { break };
      await delay(itv - diff);
      i += 1;
    } while (shouldContinuePolling);
    return d;
  } catch (e) {
    throw e;
  }
}

export default asyncPoll;
