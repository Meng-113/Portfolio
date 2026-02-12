import React, { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_SEQUENCE = [{ text: "Hi, I'm Chea Kimeng", deleteAfter: false }];

function normalizeSequences(sequences) {
  if (!Array.isArray(sequences) || sequences.length === 0) {
    return DEFAULT_SEQUENCE;
  }

  return sequences
    .map((sequence) => {
      if (typeof sequence === 'string') {
        return { text: sequence, deleteAfter: true };
      }

      if (sequence && typeof sequence === 'object') {
        return {
          text: String(sequence.text ?? ''),
          pauseAfter: sequence.pauseAfter,
          deleteAfter: sequence.deleteAfter ?? true,
        };
      }

      return null;
    })
    .filter((sequence) => sequence && sequence.text.length > 0);
}

export default function AnimationHero({
  sequences = DEFAULT_SEQUENCE,
  typingSpeed = 50,
  startDelay = 200,
  autoLoop = true,
  loopDelay = 2000,
  deleteSpeed = 30,
  pauseBeforeDelete = 1000,
  naturalVariance = true,
  className = '',
}) {
  const normalizedSequences = useMemo(
    () => normalizeSequences(sequences),
    [sequences],
  );
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const getTypingDelay = useCallback(() => {
    if (!naturalVariance) {
      return typingSpeed;
    }

    const random = Math.random();
    if (random < 0.1) {
      return typingSpeed * 2;
    }
    if (random > 0.9) {
      return typingSpeed * 0.55;
    }

    const variance = 0.35;
    const min = typingSpeed * (1 - variance);
    const max = typingSpeed * (1 + variance);
    return Math.random() * (max - min) + min;
  }, [naturalVariance, typingSpeed]);

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted || normalizedSequences.length === 0) {
      return undefined;
    }

    const currentSequence = normalizedSequences[sequenceIndex];
    const currentText = currentSequence.text;
    let nextDelay = typingSpeed;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        nextDelay = getTypingDelay();
        const timeout = setTimeout(
          () => setCharIndex((prev) => prev + 1),
          nextDelay,
        );
        return () => clearTimeout(timeout);
      }

      const pauseDuration = currentSequence.pauseAfter ?? pauseBeforeDelete;

      if (currentSequence.deleteAfter) {
        const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        return () => clearTimeout(timeout);
      }

      const isLast = sequenceIndex === normalizedSequences.length - 1;
      if (isLast && !autoLoop) {
        return undefined;
      }

      const timeout = setTimeout(
        () => {
          setSequenceIndex((prev) => (prev + 1) % normalizedSequences.length);
          setCharIndex(0);
        },
        isLast ? loopDelay : pauseDuration,
      );
      return () => clearTimeout(timeout);
    }

    if (charIndex > 0) {
      const timeout = setTimeout(
        () => setCharIndex((prev) => prev - 1),
        deleteSpeed,
      );
      return () => clearTimeout(timeout);
    }

    const isLast = sequenceIndex === normalizedSequences.length - 1;
    if (isLast && !autoLoop) {
      return undefined;
    }

    const timeout = setTimeout(
      () => {
        setIsDeleting(false);
        setSequenceIndex((prev) => (prev + 1) % normalizedSequences.length);
      },
      isLast ? loopDelay : 120,
    );
    return () => clearTimeout(timeout);
  }, [
    autoLoop,
    charIndex,
    deleteSpeed,
    isDeleting,
    isStarted,
    loopDelay,
    naturalVariance,
    normalizedSequences,
    pauseBeforeDelete,
    sequenceIndex,
    getTypingDelay,
    typingSpeed,
  ]);

  const currentText = normalizedSequences[sequenceIndex]?.text ?? '';
  const displayText = currentText.slice(0, charIndex);

  return (
    <span className={`inline-flex items-center gap-1 ${className}`.trim()}>
      <span>{displayText || '\u00A0'}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}
