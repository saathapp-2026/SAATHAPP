with open('./src/pages/seller/Membership.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    """        </div>
      )}
    </>
  );
}""",
    """        </div>
      )}
      <ConfirmDialog
        open={!!confirmCancel}
        title={confirmCancel?.title}
        message={confirmCancel?.message}
        danger={confirmCancel?.danger}
        confirmLabel={confirmCancel?.confirmLabel || 'Confirm'}
        onCancel={() => setConfirmCancel(null)}
        onConfirm={() => {
          confirmCancel?.action();
          setConfirmCancel(null);
        }}
      />
    </>
  );
}"""
)

with open('./src/pages/seller/Membership.jsx', 'w') as f:
    f.write(content)
