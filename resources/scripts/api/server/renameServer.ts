import http from '@/api/http';

export default (uuid: string, name: string, type: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/client/servers/${uuid}/settings/rename`, { name, type })
            .then(() => resolve())
            .catch(reject);
    });
};
