"use client";

export const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
};