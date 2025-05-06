/**
 * Simple Event Bus for decoupling modules
 */
class EventBus {
    constructor() {
        this.listeners = {};
    }

    /**
     * Subscribe to an event
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} callback - The function to call when the event is published
     */
    subscribe(eventType, callback) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} eventType - The type of event to unsubscribe from
     * @param {Function} callback - The callback function to remove
     */
    unsubscribe(eventType, callback) {
        if (!this.listeners[eventType]) {
            return;
        }
        this.listeners[eventType] = this.listeners[eventType].filter(
            listener => listener !== callback
        );
    }

    /**
     * Publish an event
     * @param {string} eventType - The type of event to publish
     * @param {any} data - The data to pass to the listeners
     */
    publish(eventType, data) {
        if (!this.listeners[eventType]) {
            return;
        }
        this.listeners[eventType].forEach(listener => {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in event listener for ${eventType}:`, error);
            }
        });
    }
}
