# ===== 設定 =====
TEX     = platex
DVIPDF  = dvipdfmx
BIB     = pbibtex
TARGET  = 0212

# ===== デフォルト =====
all: $(TARGET).pdf

# ===== PDF生成 =====
$(TARGET).pdf: $(TARGET).dvi
	$(DVIPDF) $<

# ===== DVI生成（参照解決のため2回）=====
$(TARGET).dvi: $(TARGET).tex
	$(TEX) $(TARGET).tex
	$(TEX) $(TARGET).tex

# ===== 参考文献（BibTeX使用時）=====
bib:
	$(TEX) $(TARGET).tex
	$(BIB) $(TARGET)
	$(TEX) $(TARGET).tex
	$(TEX) $(TARGET).tex

# ===== お掃除 =====
clean:
	rm -f *.aux *.log *.dvi *.bbl *.blg *.toc *.out *.lof *.lot

# ===== 完全削除 =====
distclean: clean
	rm -f $(TARGET).pdf
