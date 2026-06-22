# MY_PG

## Deployment

### Render

1. Set the build command to:

```bash
pip install -r requirements.txt
```

2. Set the start command to:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

3. Add `runtime.txt` with:

```text
python-3.14
```

4. Ensure `main.py` exists in the repository root and exposes `app`.

5. Deploy.

### Netlify

1. Place `netlify.toml` in the repository root.
2. Connect the repo to Netlify.
3. Set build command:

```bash
npm install
npm run build
```

4. Set publish directory:

```text
frontend/dist
```

5. Set environment variable in Netlify UI:

```text
VITE_API_URL=https://<YOUR_BACKEND_URL>
```

6. Deploy the frontend.

### Notes

- Do not commit `backend/.env`.
- Use `backend/.env.example` as a template instead.
