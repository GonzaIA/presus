import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const StepItems: React.FC = () => {
  const { items, addItem, removeItem, updateItem, config, setConfig } = useQuoteStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', precio: '' });

  const handleAddItem = () => {
    if (newItem.titulo.trim() && newItem.precio) {
      addItem({
        titulo: newItem.titulo.trim(),
        descripcion: newItem.descripcion.trim(),
        precio: parseFloat(newItem.precio) || 0
      });
      setNewItem({ titulo: '', descripcion: '', precio: '' });
      setShowForm(false);
    }
  };

  const handleEditItem = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setNewItem({ titulo: item.titulo, descripcion: item.descripcion, precio: item.precio.toString() });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const saveEdit = () => {
    if (editingId !== null) {
      updateItem(editingId, { titulo: newItem.titulo, descripcion: newItem.descripcion, precio: parseFloat(newItem.precio) || 0 });
      setEditingId(null);
      setNewItem({ titulo: '', descripcion: '', precio: '' });
      setShowForm(false);
    }
  };

  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    const iva = config.ivaEnabled ? subtotal * (config.iva / 100) : 0;
    return { subtotal, iva, total: subtotal + iva };
  };

  const { subtotal, iva, total } = calcularTotal();

  return (
    <div className="space-y-6">
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 && !showForm && (
            <Card className="text-center py-8">
              <span className="material-symbols-outlined text-4xl text-slate-600 mb-3 block">inventory_2</span>
              <h3 className="text-base font-semibold text-slate-300 mb-2">Sin items</h3>
              <p className="text-sm text-slate-500 mb-4">Añade los servicios o productos</p>
              <Button onClick={() => setShowForm(true)}>Añadir Item</Button>
            </Card>
          )}

          {items.map(item => (
            <Card key={item.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-sm">receipt</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-100 text-sm truncate">{item.titulo || 'Sin título'}</h4>
                    {item.descripcion && <p className="text-xs text-slate-500 truncate">{item.descripcion}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="font-bold text-primary text-sm">${item.precio.toFixed(2)}</span>
                  <button onClick={() => handleEditItem(item.id)} className="p-1.5 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {/* Add/Edit Form */}
          {showForm && (
            <Card>
              <h4 className="font-semibold text-slate-100 mb-3 text-sm">{editingId ? 'Editar Item' : 'Nuevo Item'}</h4>
              <div className="space-y-3">
                <Input label="Título" placeholder="Ej. Servicio de pintura" value={newItem.titulo} onChange={e => setNewItem({...newItem, titulo: e.target.value})} />
                <Input label="Descripción" asTextarea rows={2} placeholder="Detalles..." value={newItem.descripcion} onChange={e => setNewItem({...newItem, descripcion: e.target.value})} />
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input label="Precio" type="number" placeholder="0.00" value={newItem.precio} onChange={e => setNewItem({...newItem, precio: e.target.value})} />
                  </div>
                  <Button variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); setNewItem({ titulo: '', descripcion: '', precio: '' }); }}>Cancelar</Button>
                  <Button onClick={editingId ? saveEdit : handleAddItem}>{editingId ? 'Guardar' : 'Añadir'}</Button>
                </div>
              </div>
            </Card>
          )}

          {!showForm && (
            <button onClick={() => { setEditingId(null); setNewItem({ titulo: '', descripcion: '', precio: '' }); setShowForm(true); }} className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm">
              <span className="material-symbols-outlined">add</span>
              Añadir Item
            </button>
          )}
        </div>

        {/* Summary + IVA */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-6">
            <h4 className="font-semibold text-slate-100 mb-4 text-sm">Resumen</h4>
            
            {/* IVA Toggle */}
            <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Aplicar IVA</span>
                <button onClick={() => setConfig({ ivaEnabled: !config.ivaEnabled })} className={`w-10 h-5 rounded-full transition-colors ${config.ivaEnabled ? 'bg-primary' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${config.ivaEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              {config.ivaEnabled && (
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    max="100"
                    value={config.iva} 
                    onChange={e => setConfig({ iva: parseFloat(e.target.value) || 0 })}
                    className="w-16 px-2 py-1 text-center text-sm bg-slate-800 border border-slate-700 rounded text-slate-200"
                  />
                  <span className="text-sm text-slate-500">% IVA</span>
                </div>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-700 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-300">${subtotal.toFixed(2)}</span>
              </div>
              {config.ivaEnabled && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">IVA ({config.iva}%)</span>
                  <span className="font-medium text-slate-300">${iva.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="font-bold text-slate-100">Total</span>
                <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
